"use strict";

//SELECTORS

const header = document.querySelector("header");
const navigation = document.querySelector(".nav");

const page = document.querySelector(".page");

// pobranie wysokości navigacji do efektu przejścia
let navHeight = navigation.offsetHeight;

const buttonScrollTop = document.querySelector(".scroll-up--button");

// Slow mode for window

function displayPage() {
  header.classList.remove("header-hidden");
}

displayPage();

// STICKY NAV

const headerObsCallback = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  //   logika
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");

    if (buttonScrollTop.classList.contains("display-none")) {
      buttonScrollTop.classList.remove("display-none");
    }

    // dodać wyświetlanie się buttona
  } else {
    navigation.classList.remove("sticky");
    buttonScrollTop.classList.add("display-none");

    // usuwanie buttona
  }
};

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);

headerObserver.observe(header);

// Obverver dla view port

// const windowObsCallback = function (entries, observer) {
//   const entry = entries[0];

//   console.log(entry);
//   if (entry.isIntersecting && window.innerWidth > window.innerHeight) {
//     let temp = buttonScrollTop.style.top;
//     console.log("top: ", top);
//     buttonScrollTop.style.top = buttonScrollTop.style.left;
//     buttonScrollTop.style.left = temp;
//   }
// };

// const windowObsOptions = { root: null, threshold: 0 };

// const windowObserver = new IntersectionObserver(
//   windowObsCallback,
//   windowObsOptions
// );

// windowObserver.observe(window);
// Przyciski nawigacji

document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();

  console.log(e.target);

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");

    // const offsetTop = document.querySelector(`.${id}`).offsetTop;

    // scrollTo({ top: offsetTop, behavior: "smooth" });
    document
      .querySelector(`#${id}`)
      .scrollIntoView({ behavior: "smooth", block: "end" });
  }
});

// Opacity nav
const opacityHnadler = function (e, opacity) {
  // logic
  // sprawdzenie czy jest to nasz link
  if (e.target.classList.contains("nav-link")) {
    e.preventDefault();

    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");

    // dla każdego elementu innego niż element nasłuchiwany wykonaj przysłonę

    siblings.forEach((element) => {
      if (link !== element) {
        element.style.opacity = opacity;
      }
    });
  }
};

// Mouse over
navigation.addEventListener("mouseover", function (e) {
  opacityHnadler(e, 0.35);
});

// Mouse out
navigation.addEventListener("mouseout", function (e) {
  opacityHnadler(e, 1);
});

// Viewport on mobile

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

console.log(navHeight);
document.documentElement.style.setProperty("--vNav", `${navHeight}px`);

// Resize
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);

  navHeight = navigation.offsetHeight;

  document.documentElement.style.setProperty("--vhNav", `${navHeight}px`);

  console.log(navHeight);
});

// Functions for resize

const changeFooter = function (winodwW, windowH) {
  if (windowH < winodwW) {
  }
};

// SECTION

const allSections = document.querySelectorAll(".section");

const sectionRevealCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  console.log(entry);
  console.log(entry.target);

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionRevealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  sectionRevealCallback,
  sectionRevealOptions
);

// dodaj ukrycie dla każdej sekcji i zacznij ją obserwować
allSections.forEach((section) => {
  section.classList.add("section-hidden");
  sectionObserver.observe(section);
});

// FOOTER

// Icons in footer
const footerIcons = document.querySelector(".footer-icons");

const footerOpacityHandler = (e, opacityTarget, opacityOthers) => {
  e.preventDefault();

  // do poprawienia - lepsze oznaczenia html można tu zrobić
  if (e.target.classList.contains("footer-img")) {
    const link = e.target;

    const siblings = link
      .closest(".footer-icons")
      .querySelectorAll(".footer-img");

    siblings.forEach((element) => {
      if (element != link) {
        element.style.opacity = opacityOthers;
      } else if (element === link) {
        element.style.opacity = opacityTarget;
      }
    });
  }
};

footerIcons.addEventListener("mouseover", function (e) {
  footerOpacityHandler(e, 1, 0.4);
});

footerIcons.addEventListener("mouseout", function (e) {
  footerOpacityHandler(e, 0.8, 0.8);
});

// button Scroll up

buttonScrollTop.addEventListener("click", () => {
  console.log("hi");
  document.querySelector("header").scrollIntoView(true);
});

// CONTACT

// Changing colors

const contactContainer = document.querySelector(".contact-container");

function contactChangeColor(e, color) {
  e.preventDefault();
  console.log(e.target.classList);
  if (e.target.classList.contains("contact-img")) {
    if (color === 1) {
      let newColor = e.target.classList[1].trim();
      e.target.style.backgroundColor = `var(--${newColor}-color)`;
    } else if (color === 0) {
      e.target.style.backgroundColor = `var(--color-primary-nav)`;
    }
  }
}

// możemy dodać po prostu clasę która będzie pusta/identyczna co klasa obok tylko z efektem after/before
// można to zrobić w dwie strony na dodaniu i na usunięciu (dodać inna klasę z odwróconym kolorem)

contactContainer.addEventListener("mouseover", function (e) {
  contactChangeColor(e, 1);
});
contactContainer.addEventListener("mouseout", function (e) {
  contactChangeColor(e, 0);
});

// SLIDER

const slides = document.querySelectorAll(".slide");
const btnUp = document.querySelector(".slider-btn-up");
const btnDown = document.querySelector(".slider-btn-down");

// translate Y plusowa wartość -> przesunięcie w dół
//  wartośćminus -> ku górze

slides.forEach((slide, i) => {
  slide.style.transform = `translateY(${100 * i}%)`;
});

let currentSlide = 0;
const slidesLength = slides.length;

btnDown.addEventListener("click", function (e) {
  if (currentSlide < slidesLength - 1) {
    currentSlide++;
    slides.forEach((slide, i) => {
      slide.style.transform = `translateY(${100 * (i - currentSlide)}%)`;
    });
  }
});

btnUp.addEventListener("click", function (e) {
  if (currentSlide > 0) {
    currentSlide--;
    slides.forEach((slide, i) => {
      slide.style.transform = `translateY(${100 * (i - currentSlide)}%)`;
    });
  }
});
