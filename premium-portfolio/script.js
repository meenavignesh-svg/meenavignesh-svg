// script.js – GSAP animations and UI interactions

// Theme toggle (optional – can be extended later)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const root = document.documentElement;
  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  const toggle = () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(cur);
  };
  themeToggle.addEventListener('click', toggle);
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });
}

// Sticky navigation background change on scroll
const siteNav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    siteNav.classList.add('scrolled');
  } else {
    siteNav.classList.remove('scrolled');
  }
});

// GSAP animations (respect reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero DNA line animation
  gsap.from('#helixA', {duration: 2, drawSVG: "0%", ease: "power2.out"});
  gsap.from('#helixB', {duration: 2, drawSVG: "0%", ease: "power2.out", delay: 0.2});

  // Section fade‑in on scroll
  document.querySelectorAll('.section').forEach(sec => {
    gsap.from(sec, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// Simple hover effect for project cards (already via CSS, but can add slight scale)
document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {scale: 1.02, duration: 0.2});
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {scale: 1, duration: 0.2});
  });
});
