// https://w3bits.com/javascript-slidetoggle/ has been used as a reference
import { slideUp } from "./slideUp";
import { slideDown } from "./slideDown";

const slideToggle = function (target, duration = 600) {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};
