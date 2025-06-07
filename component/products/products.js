import productsHTML from "../products/products.html";

document.addEventListener("DOMContentLoaded", initFilter);

function initFilter() {
  const productsElement = document.getElementById("products");
  if (!productsElement) return;

  productsElement.innerHTML = productsHTML;
}

