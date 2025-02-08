import roomsHTML from "../rooms/rooms.html";

document.addEventListener("DOMContentLoaded", function () {
    const roomsElement = document.getElementById("rooms");
    if (!roomsElement) return;
    roomsElement.innerHTML = roomsHTML;
});
