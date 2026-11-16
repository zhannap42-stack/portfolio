const menu = document.querySelector(".home-menu");
const menuButton = menu.querySelector("button");
const menuIcon = menuButton.querySelector("path");
const navigation = menu.querySelector("nav");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = !open;
  menuIcon.setAttribute("d", open ? "M18 6 6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16");
}

menuButton.addEventListener("click", () => setMenu(navigation.hidden));
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || navigation.hidden) return;
  setMenu(false);
  menuButton.focus();
});

for (const photo of document.querySelectorAll("[data-fallback]")) {
  const useFallback = () => { photo.src = photo.dataset.fallback; };
  photo.addEventListener("error", useFallback, { once: true });
  if (photo.complete && !photo.naturalWidth) useFallback();
}

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove("reveal-pending");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -12% 0px" });

  for (const element of document.querySelectorAll(".reveal")) {
    if (element.getBoundingClientRect().top < innerHeight * .88) continue;
    element.classList.add("reveal-pending");
    observer.observe(element);
  }
}
