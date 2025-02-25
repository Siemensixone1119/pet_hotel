import filtersHTML from "../filters/filters.html";

document.addEventListener("DOMContentLoaded", function () {
    const filtersElement = document.getElementById("filters");
    if (!filtersElement) return;
    filtersElement.innerHTML = filtersHTML;
});
