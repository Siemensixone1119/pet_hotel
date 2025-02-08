import geolocationHTML from "../geolocation/geolocation.html";

document.addEventListener("DOMContentLoaded", function () {
    const geolocationElement = document.getElementById("geolocation");
    if (!geolocationElement) return;
    geolocationElement.innerHTML = geolocationHTML;
});
