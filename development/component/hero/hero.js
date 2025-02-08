import heroHTML from "../hero/hero.html";

document.addEventListener("DOMContentLoaded", function () {
    const heroElement = document.getElementById("hero");
    if (!heroElement) return;
    heroElement.innerHTML = heroHTML;
});
