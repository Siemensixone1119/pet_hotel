import reviewsHTML from "../reviews/reviews.html";

document.addEventListener("DOMContentLoaded", function () {
    const reviewsElement = document.getElementById("reviews");
    if (!reviewsElement) return;
    reviewsElement.innerHTML = reviewsHTML;
});
