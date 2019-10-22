const hasClass = (el, className) => {
  return el.classList
    ? el.classList.contains(className)
    : new RegExp("\\b" + className + "\\b").test(el.className);
};

const addClass = (el, className) => {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
};

const removeClass = (className, el) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp("\\b" + className + "\\b", "g"),
      ""
    );
  }
};

const genUID = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

const dims = () => {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return {
    x: x,
    y: y
  };
};
// eslint-disable-next-line no-console
const log = console.log.bind(console);
export { addClass, removeClass, hasClass, genUID, dims, log };
