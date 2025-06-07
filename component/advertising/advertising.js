import advertisingHTML from "../advertising/advertising.html";

document.addEventListener("DOMContentLoaded", function () {
    const advertisingElement = document.getElementById("advertising");
    if (!advertisingElement) return;
    advertisingElement.innerHTML = advertisingHTML;
});
