import footerHTML from "../footer/footer.html";

document.addEventListener("DOMContentLoaded", function () {
    const footerElement = document.getElementById("footer");
    if (!footerElement) return;
    footerElement.innerHTML = footerHTML;
});
