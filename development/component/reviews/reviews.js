import reviewsHTML from "../reviews/reviews.html";

document.addEventListener("DOMContentLoaded", function () {
  const reviewsElement = document.getElementById("reviews");
  if (!reviewsElement) return;

  // Вставляем HTML с отзывами
  reviewsElement.innerHTML = reviewsHTML;

  // Находим список отзывов
  const slider = reviewsElement.querySelector(".reviews__contain");

  // Находим кнопки-стрелки
  const arrowButtons = reviewsElement.querySelectorAll(".reviews__arrow-contain .reviews__arrow button");
  if (arrowButtons.length < 2) {
    console.warn("Не найдены кнопки переключения слайдера");
    return;
  }
  const [arrowLeft, arrowRight] = arrowButtons;

  // Находим три индикатора (точки)
  const indicators = reviewsElement.querySelectorAll(".reviews__circ-el");
  if (indicators.length < 3) {
    console.warn("Ожидалось 3 индикатора, найдено:", indicators.length);
  }
  const [indicator1, indicator2, indicator3] = indicators;

  // Считаем, сколько всего «страниц» (слайдов) у нас получается
  // Допустим, показываем по 3 отзыва на каждой странице
  const itemsPerSlide = 3;
  const totalItems = slider.querySelectorAll("li").length; // кол-во отзывов (li)
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  // Текущий индекс слайда (0 означает первые отзывы)
  let currentSlide = 0;

  // Функция, которая сдвигает слайдер и меняет индикаторы
  function updateSlider() {
    // 1) СДВИГАЕМ СЛАЙДЕР ПО X:
    // ----------------------------------
    // Нужно взять ширину контейнера, в котором мы скрываем «лишние» отзывы.
    // Если у вас overflow: hidden на .contain-rev (или другом элементе),
    // используйте именно его ширину, например:
    // const viewportWidth = slider.closest(".contain-rev").offsetWidth;
    // Если же родительский .parentElement — это и есть нужный контейнер, оставьте так:
    const viewportWidth = slider.parentElement.offsetWidth;

    // Сдвигаем (translateX) на currentSlide * ширину
    slider.style.transform = `translateX(-${currentSlide * viewportWidth}px)`;
    slider.style.transition = "transform 0.5s ease";

    // 2) СБРАСЫВАЕМ ВСЕ ИНДИКАТОРЫ В СЕРЫЙ
    // ----------------------------------
    indicators.forEach((ind) => {
      const useEl = ind.querySelector("use");
      if (useEl) {
        useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-gray_point");
      }
    });

    // 3) ЛОГИКА ПОДСВЕТКИ ИНДИКАТОРОВ
    // ----------------------------------
    // - Если currentSlide === 0 => оранжевый первый
    // - Если 0 < currentSlide < totalSlides - 1 => оранжевый второй
    // - Если currentSlide === totalSlides - 1 => оранжевый третий
    if (currentSlide === 0) {
      const useEl = indicators[0].querySelector("use");
      if (useEl) {
        useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-orange_point");
      }
    } else if (currentSlide < totalSlides - 1) {
      const useEl = indicators[1].querySelector("use");
      if (useEl) {
        useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-orange_point");
      }
    } else {
      const useEl = indicators[2].querySelector("use");
      if (useEl) {
        useEl.setAttribute("href", "../../assets/image/symbol-defs.svg#icon-orange_point");
      }
    }
  }

  // Обработчики нажатия на стрелки
  arrowLeft.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  arrowRight.addEventListener("click", function () {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  // При загрузке вызываем updateSlider
  updateSlider();
});
