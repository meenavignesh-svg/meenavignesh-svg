// script.js – GSAP animations and theme toggle

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme from saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero logo animation
gsap.from('#logo', {
  duration: 1.5,
  scale: 0,
  rotation: 360,
  ease: 'back.out(1.7)',
});

// Fade‑in sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(sec => {
  gsap.from(sec, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: sec,
      start: 'top 80%',
    },
  });
});

// Project card hover tilt (using simple GSAP tilt effect)
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, { rotationY: x / 20, rotationX: -y / 20, duration: 0.2, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power2.out' });
  });
});

// Contact form validation (basic)
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  // Placeholder: In a real site you'd send this via an email service.
  alert('Thank you! Your message has been received.');
  form.reset();
});
