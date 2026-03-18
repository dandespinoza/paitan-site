// PAITAN CONTRACTING — Main JS

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.header__nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Animate elements on scroll
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stats__number[data-count]').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    counter.dataset.animated = 'true';
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounters(); statsObserver.unobserve(entry.target); }
  });
}, { threshold: 0.3 });
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// Form — let formsubmit.co handle it (no preventDefault)
