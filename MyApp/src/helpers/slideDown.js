// https://w3bits.com/javascript-slidetoggle/ has been used as a reference
//Function that slides down a target element
const slideDown = function (target, duration) {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    display = "block";
  }
  target.style.display = display;
  // console.log("Hello from the other side");

  let height = target.offsetHeight;
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.overflow = "hidden";

  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");

  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

export { slideDown };
