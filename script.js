const details = document.querySelectorAll("details");

details.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    details.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

document.addEventListener("pointerdown", (event) => {
  const waves = ["click-wave", "click-wave click-wave--2", "click-wave click-wave--3"];
  waves.forEach((className) => {
    const wave = document.createElement("span");
    wave.className = className;
    wave.style.left = `${event.clientX}px`;
    wave.style.top = `${event.clientY}px`;
    document.body.appendChild(wave);
    wave.addEventListener("animationend", () => wave.remove());
  });
});

document.addEventListener("pointerdown", (event) => {
  const link = event.target.closest("a.btn, button.btn");
  if (!link) return;
  link.classList.remove("btn-pop");
  void link.offsetWidth;
  link.classList.add("btn-pop");
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a.btn");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;

  event.preventDefault();
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: "smooth" });
});

const mediaViewer = document.querySelector(".service-media__viewer");
if (mediaViewer) {
  const video = mediaViewer.querySelector(".service-media__video");
  const prevBtn = mediaViewer.querySelector(".media-nav--prev");
  const nextBtn = mediaViewer.querySelector(".media-nav--next");
  if (video) {
    let sources = [];
    const data = mediaViewer.getAttribute("data-videos");
    if (data) {
      try {
        sources = JSON.parse(data);
      } catch (error) {
        sources = [];
      }
    }
    if (!sources.length) {
      const src = video.getAttribute("src");
      if (src) sources = [src];
    }
    let index = 0;
    const updateVideo = () => {
      video.src = sources[index];
      video.load();
      video.play().catch(() => {});
    };
    const canCycle = sources.length > 1;
    if (!canCycle) {
      prevBtn?.setAttribute("disabled", "");
      nextBtn?.setAttribute("disabled", "");
    }
    prevBtn?.addEventListener("click", () => {
      if (!sources.length) return;
      index = (index - 1 + sources.length) % sources.length;
      updateVideo();
    });
    nextBtn?.addEventListener("click", () => {
      if (!sources.length) return;
      index = (index + 1) % sources.length;
      updateVideo();
    });
  }
}

const navToggle = document.querySelector(".nav-toggle");
const stickyNav = document.querySelector(".topbar--sticky");

if (navToggle && stickyNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = stickyNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  stickyNav.addEventListener("click", (event) => {
    const link = event.target.closest(".topbar__links a");
    if (!link) return;
    stickyNav.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const showAll = () => revealItems.forEach((item) => item.classList.add("is-visible"));

  if (reducedMotion.matches) {
    showAll();
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}
