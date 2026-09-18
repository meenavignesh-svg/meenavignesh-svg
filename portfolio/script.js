(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  };

  const saved = localStorage.getItem("theme");
  applyTheme(saved === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  navToggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("open") ?? false;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  if (!reduceMotion) {
    const visual = document.querySelector(".hero-visual");
    const dna = document.querySelector(".dna");
    const panel = document.querySelector(".data-panel");

    if (visual && dna) {
      let raf = 0;
      let mx = 0, my = 0;
      let tx = 0, ty = 0;
      visual.addEventListener("pointermove", (event) => {
        const r = visual.getBoundingClientRect();
        mx = ((event.clientX - r.left) / r.width - 0.5) * 2;
        my = ((event.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(() => {
          tx += (mx * 22 - tx) * 0.12;
          ty += (my * 18 - ty) * 0.12;
          dna.style.transform = `rotate(10deg) rotateY(${-18 + tx}deg) rotateX(${-ty}deg) translateZ(18px)`;
          if (panel) panel.style.transform = `translateZ(75px) translate(${mx * -10}px,${my * -8}px)`;
          raf = 0;
        });
      });
      visual.addEventListener("pointerleave", () => {
        dna.style.transform = "rotate(10deg) rotateY(-18deg)";
        if (panel) panel.style.transform = "translateZ(75px)";
      });
    }

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-6px) translateZ(8px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  if (!reduceMotion && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-copy > *", {
      opacity: 0,
      y: 24,
      duration: 0.75,
      stagger: 0.08,
      ease: "power2.out"
    });

    gsap.from(".hero-visual", {
      opacity: 0,
      scale: 0.92,
      duration: 1,
      delay: 0.2,
      ease: "power2.out"
    });

    document.querySelectorAll(".section").forEach((section) => {
      gsap.from(section.querySelectorAll(".section-heading, .about-grid, .project-card, .skill-grid, .pipeline, .principles, .contact-card"), {
        opacity: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true
        }
      });
    });
  }

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });
})();
