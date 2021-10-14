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
  page.classList.remove("page-hidden");
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
    document.querySelector(`.${id}`).scrollIntoView(true);
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

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);

  navHeight = nav.offsetHeight;
  console.log(navHeight);
});

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
