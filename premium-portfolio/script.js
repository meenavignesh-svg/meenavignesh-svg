(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const siteNav = document.getElementById("site-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  };

  setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  navToggle?.addEventListener("click", () => {
    const open = navList?.classList.toggle("open") ?? false;
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navList?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const updateNav = () => siteNav?.classList.toggle("scrolled", window.scrollY > 50);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        scrollTrigger: { trigger: section, start: "top 85%", once: true }
      });
    });
    document.querySelectorAll(".project").forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.02, duration: 0.2 }));
      card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.2 }));
    });
  }
})();
