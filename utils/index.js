// 判断是否是一个dom对象
export const isDom = (el) => {
  return typeof el === "object"
    ? el instanceof HTMLElement
    : el &&
        typeof obj === "object" &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === "string";
};
export const isArray = (array) => {
  return array.constructor === Array;
};
