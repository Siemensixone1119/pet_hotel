import advantagesHTML from "../advantages/advantages.html";

document.addEventListener("DOMContentLoaded", function () {
    const advantagesElement = document.getElementById("advantages");
    if (!advantagesElement) return;
    advantagesElement.innerHTML = advantagesHTML;
});
