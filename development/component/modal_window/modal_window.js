import modalHTML from "../modal_window/modal_window.html";

document.addEventListener("DOMContentLoaded", function () {
    const modalElement = document.getElementById("modal");
    if (!modalElement) return;
    modalElement.innerHTML = modalHTML;
});
