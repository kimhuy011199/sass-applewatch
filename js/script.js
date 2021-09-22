const removeHoverEffect = function () {
  function hasTouch() {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  if (hasTouch()) {
    try {
      for (let si in document.styleSheets) {
        let styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;
        for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;
          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }
};

const handlerFeature = function () {
  currentFeature = 0;
  const features = [...document.querySelectorAll(".health__feature")];
  const paras = [...document.querySelectorAll(".health__para")];
  features.forEach(function (feature, i) {
    feature.style.transform = `translateX(${i * 100}%)`;
  });

  const updateUI = function () {
    features.forEach(function (feature, i) {
      feature.style.transform = `translateX(${(i - currentFeature) * 100}%)`;
      paras[i].classList.add("health__hidden");
    });
    paras[currentFeature].classList.remove("health__hidden");
  };

  const nextBtn = document.querySelector(".health__next");
  nextBtn.addEventListener("click", function () {
    if (currentFeature === 3) return;
    currentFeature++;
    updateUI();
  });

  const prevBtn = document.querySelector(".health__prev");
  prevBtn.addEventListener("click", function () {
    if (currentFeature === 0) return;
    currentFeature--;
    updateUI();
  });
};

const handlerResponsiveMenu = function () {
  const menuBtn = document.querySelector(".nav__btn");
  menuBtn.addEventListener("click", function (e) {
    const menuList = document.querySelector(".nav__list");
    menuList.classList.toggle("nav__hidden");
  });
};

const init = function () {
  // removeHoverEffect();
  handlerFeature();
  handlerResponsiveMenu();
};

init();
