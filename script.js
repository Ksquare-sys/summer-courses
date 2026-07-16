(() => {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".header-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!header) {
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY <= 8;
    const scrollDelta = currentScrollY - lastScrollY;

    header.classList.toggle("is-at-top", isAtTop);

    if (isAtTop) {
      header.classList.remove("is-hidden");
    } else if (scrollDelta > 0 && currentScrollY > 96) {
      header.classList.add("is-hidden");
    } else if (scrollDelta < 0) {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );
})();

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
