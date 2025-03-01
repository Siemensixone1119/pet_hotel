import cardHTML from "../room_card/card.html";

document.addEventListener("DOMContentLoaded", function () {
    const cardElement = document.getElementById("card");
    if (!cardElement) return;
    cardElement.innerHTML = cardHTML;
});
