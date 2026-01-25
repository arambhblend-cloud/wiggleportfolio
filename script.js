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

document.addEventListener("click", (event) => {
  const link = event.target.closest("a.btn");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href) return;

  event.preventDefault();
  link.classList.remove("btn-pop");
  void link.offsetWidth;
  link.classList.add("btn-pop");

  setTimeout(() => {
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (link.target === "_blank") {
      window.open(href, "_blank", "noopener");
      return;
    }

    window.location.href = href;
  }, 700);
});
