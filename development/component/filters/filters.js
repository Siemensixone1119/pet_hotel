import filtersHTML from "../filters/filters.html";

document.addEventListener("DOMContentLoaded", function () {
  const filtersElement = document.getElementById("filters");
  if (!filtersElement) return;
  filtersElement.innerHTML = filtersHTML;

  // Следим за изменениями в DOM и запускаем initFilter(), когда кнопки появятся
  const observer = new MutationObserver(() => {
    if (document.querySelector("[data-open-filter]")) {
      initFilter();
      observer.disconnect(); // Отключаем наблюдение после инициализации
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log(window.innerWidth);
});

function initFilter() {
  const refs = {
    openFilterBtn: document.querySelector("[data-open-filter]"),
    closeFilterBtn: document.querySelector("[data-close-filter]"),
    filter: document.querySelector("[data-filter]"),
    backdrop: document.querySelector("[data-backdrop]"),
  };
  prHidden(refs)
  refs.openFilterBtn.addEventListener("click", () => toggleFilter(refs));
  refs.closeFilterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleFilter(refs);
  });
  window.addEventListener("resize", () => prHidden(refs));
}

function toggleFilter(refs) {
  refs.filter.classList.toggle("hidden");
  refs.backdrop.classList.toggle("hidden");
}

function prHidden(refs) {
  if (window.innerWidth >= 1024) {
    refs.filter.classList.remove("hidden");
  } else {
    if (!refs.filter.classList.contains("hidden")) {
      refs.filter.classList.add("hidden");
      refs.backdrop.classList.add("hidden");
    }
  }
}
