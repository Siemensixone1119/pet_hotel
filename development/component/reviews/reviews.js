import reviewsHTML from "../reviews/reviews.html";

document.addEventListener("DOMContentLoaded", function () {
  const reviewsElement = document.getElementById("reviews");
  if (!reviewsElement) return;
  
  // Вставляем HTML с отзывами
  reviewsElement.innerHTML = reviewsHTML;
  
  // Получаем контейнер отзывов
  const reviewsList = reviewsElement.querySelector(".reviews__contain");
  if (!reviewsList) return;
  
  // Сохраняем оригинальные отзывы и их число
  const originalReviews = Array.from(reviewsList.children);
  const originalCount = originalReviews.length;
  
  // Клонируем оригинальные отзывы для автоскролла (бесшовное зацикливание через CSS-анимацию)
  originalReviews.forEach(item => {
    const clonedItem = item.cloneNode(true);
    clonedItem.setAttribute("aria-hidden", "true");
    reviewsList.appendChild(clonedItem);
  });
  
  // Включаем автоскролл через CSS-анимацию (если используется)
  reviewsList.setAttribute("data-animated", "true");
  
  // Основной слайдер – работаем с контейнером отзывов
  const slider = reviewsList;
  // Все слайды (оригинальные + клоны), но для переключения и индикаторов используем только оригинальные
  const slides = slider.querySelectorAll(".reviews__el");
  // totalSlides включает клоны, поэтому для логики переключения будем использовать originalCount
  
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = reviewsElement.querySelectorAll(".reviews__circ-el");
  
  // Текущий индекс (0 ... originalCount - 1)
  let currentIndex = 0;
  
  // Функция обновления слайдера и индикаторов
  function updateSlider(transition = true) {
    const singleSlide = slides[0];
    const style = window.getComputedStyle(singleSlide);
    const marginRight = parseFloat(style.marginRight) || 0;
    const slideWidth = singleSlide.offsetWidth + marginRight;
    
    slider.style.transition = transition ? "transform 0.5s ease" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Определяем активный индикатор:
    // Если currentIndex === 0 → активен первый;
    // Если currentIndex === originalCount - 1 → активен последний;
    // Иначе – активен центральный (то есть, индикатор с индексом Math.floor(indicators.length/2)).
    let activeIndicatorIndex;
    if (currentIndex === 0) {
      activeIndicatorIndex = 0;
    } else if (currentIndex === originalCount - 1) {
      activeIndicatorIndex = indicators.length - 1;
    } else {
      activeIndicatorIndex = Math.floor(indicators.length / 2);
    }
    
    indicators.forEach((ind, idx) => {
      const useEl = ind.querySelector("use");
      if (useEl) {
        if (idx === activeIndicatorIndex) {
          useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-orange_point");
          ind.classList.add("active");
        } else {
          useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-gray_point");
          ind.classList.remove("active");
        }
      }
    });
  }
  
  // Обработчики кнопок – циклический режим по оригинальным отзывам
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = originalCount - 1;
    }
    updateSlider();
  });
  
  nextBtn.addEventListener("click", () => {
    if (currentIndex < originalCount - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  });
  
  // Реализация свободного перелистывания (drag/swipe) для мобильных и планшетов (при ширине < 992px)
  let isFreeScroll = window.innerWidth < 992;
  let startX = 0;
  let initialOffset = 0;
  let currentOffset = 0;
  let slideWidth = 0;
  
  function computeSlideWidth() {
    const singleSlide = slides[0];
    const style = window.getComputedStyle(singleSlide);
    const marginRight = parseFloat(style.marginRight) || 0;
    return singleSlide.offsetWidth + marginRight;
  }
  
  if (isFreeScroll) {
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      slideWidth = computeSlideWidth();
      initialOffset = currentIndex * slideWidth;
      slider.style.transition = "none";
    }, { passive: true });
    
    slider.addEventListener("touchmove", (e) => {
      const currentX = e.touches[0].clientX;
      const delta = startX - currentX;
      currentOffset = initialOffset + delta;
      // Ограничиваем диапазон свободного перелистывания от 0 до (originalCount - 1) * slideWidth
      if (currentOffset < 0) currentOffset = 0;
      if (currentOffset > (originalCount - 1) * slideWidth) {
        currentOffset = (originalCount - 1) * slideWidth;
      }
      slider.style.transform = `translateX(-${currentOffset}px)`;
    }, { passive: true });
    
    slider.addEventListener("touchend", () => {
      currentIndex = Math.round(currentOffset / slideWidth);
      updateSlider(false);
    }, { passive: true });
  }
  
  window.addEventListener("resize", () => {
    isFreeScroll = window.innerWidth < 1024;
    updateSlider(false);
  });
  
  // Инициализация
  updateSlider();
});
