import headerHTML from "../header/header.html";

document.addEventListener("DOMContentLoaded", initHeader);

function initHeader() {
  const headerElement = document.getElementById("header");
  if (!headerElement) return;

  headerElement.innerHTML = headerHTML;

  initMenu();
}

function initMenu() {
  const refs = {
    openMenuBtn: document.querySelector("[data-open-menu]"),
    closeMenuBtn: document.querySelector("[data-close-menu]"),
    menu: document.querySelector("[data-menu]"),
  };

  refs.openMenuBtn.addEventListener("click", () => toggleMenu(refs));
  refs.closeMenuBtn.addEventListener("click", () => toggleMenu(refs));
}

function toggleMenu(refs) {
  refs.menu.classList.toggle("hidden");
}
