"use strict";

//SELECTORS

const header = document.querySelector("header");
const navigation = document.querySelector(".nav");

const buttonScrollTop = document.querySelector(".scroll-up--button");

// STICKY NAV

const headerObsCallback = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  //   logika
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");

    buttonScrollTop.style.opacity = 0.8;

    // dodać wyświetlanie się buttona
  } else {
    navigation.classList.remove("sticky");

    buttonScrollTop.style.opacity = 0;

    // usuwanie buttona
  }
};

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-76.13px",
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);

headerObserver.observe(header);

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
  opacityHnadler(e, 0.5);
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
});

// button Scroll up

buttonScrollTop.addEventListener("click", () => {
  console.log("hi");
  document.querySelector("header").scrollIntoView(true);
});
