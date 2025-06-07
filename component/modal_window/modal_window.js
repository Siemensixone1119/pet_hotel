import modalHTML from "../modal_window/modal_window.html";

document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("modal");
  if (!modalElement) return;
  modalElement.innerHTML = modalHTML;

  initRegistration()
});

function initRegistration() {
  const refs = {
    openModalBtn: document.querySelector("[data-open-registration]"),
    closeModalBtn: document.querySelector("[data-close-registration]"),
    modalWindow: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", () => toggleRegistration(refs));
  refs.closeModalBtn.addEventListener("click", () => toggleRegistration(refs))
}

function toggleRegistration(refs) {
  refs.modalWindow.classList.toggle("hidden");
  document.body.classList.toggle("noScroll");
  window.scroll({
  top: 0,
  left: 0,
  behavior: "smooth",
});
}
