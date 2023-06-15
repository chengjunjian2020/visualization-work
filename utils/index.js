// 判断是否是一个dom对象
export const isDom = (el) => {
  return typeof el === "object"
    ? el instanceof HTMLElement
    : el &&
        typeof obj === "object" &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === "string";
};
//判断是否是一个数组
export const isArray = (array) => {
  return array.constructor === Array;
};

export const createCanvasContext = (id) => {
  let el = typeof id === "string" ? document.querySelector(id) : id;
  const context = el.getContext("2d");
  return context;
};

export const $ = (id) => {
  return document.querySelector(id);
};

export const setStyleList = (el, styleList) => {
  if (styleList.constructor !== Object) {
    return;
  }
  Object.keys(styleList).forEach((key) => {
    el.style[key] = styleList[key];
  });
};
