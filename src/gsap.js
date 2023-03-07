import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

  gsap.to(".filled-text, .outline-text", {
    scrollTrigger: {
      trigger: ".filled-text, .outline-text",
      start: "introduction bottom",
      end: "bottom introduction",
      scrub: 1,
    },
    x: 200,
  });

  gsap.to(".image", {
    scrollTrigger: {
      trigger: ".image",
      start: "introduction bottom",
      end: "bottom introduction",
      scrub: 1,
      markers: true,
    },
    x: -250,
  });