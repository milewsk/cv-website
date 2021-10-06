"use strict";

// STICKY NAV

const header = document.querySelector("header");

const navigation = document.querySelector(".nav");

const headerObsCallback = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  //   logika
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
  } else {
    navigation.classList.remove("sticky");
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

    console.log(id);

    document.querySelector(`.${id}`).scrollIntoView({ behavior: "smooth" });
  }
});

// Opacity nav
const opacityHnadler = function (e, opacity) {
  e.preventDefault();

  const link = e.target;
  console.log(link);

  const siblings = link.closest();
  // if(){}
};

// Mouse over
navigation.addEventListener("mouseover", function (e) {
  opacityHnadler(e, 0.7);
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
