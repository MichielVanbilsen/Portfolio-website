import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// EYE CATCHER
gsap.to("#element1, #element3, #element5", {
  scrollTrigger: {
    trigger: ".eye-catcher",
    start: "top",
    end: "bottom introduction",
    scrub: 1,
    markers: false,
  },
  x: -250,
});

gsap.to("#element2, #element4", {
  scrollTrigger: {
    trigger: ".eye-catcher",
    start: "top",
    end: "bottom introduction",
    scrub: 1,
    markers: false,
  },
  x: 250,
});


// PROJECTS

  gsap.to(".filled-text, .outline-text", {
    scrollTrigger: {
      trigger: ".filled-text, .outline-text",
      start: "introduction bottom",
      end: "bottom introduction",
      scrub: 1,
    },
    x: 200,
  });

  gsap.to(".introduction-image", {
    scrollTrigger: {
      trigger: ".introduction-image",
      start: "introduction bottom",
      end: "bottom introduction",
      scrub: 1,
      markers: false,
    },
    x: -250,
  });

  gsap.to(".image", {
    scrollTrigger: {
      trigger: ".image",
      start: "introduction bottom",
      end: "bottom introduction",
      scrub: 1,
      markers: false,
    },
    x: -2000,
  });