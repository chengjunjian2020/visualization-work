// 判断是否是一个dom对象
export const isDom = (el:HTMLElement) => {
  return typeof el === "object"
    ? el instanceof HTMLElement
    : el &&
        typeof el === "object" &&
        (el as HTMLElement).nodeType === 1 &&
        typeof (el as HTMLElement).nodeName === "string";
};

export const isObject = (obj:Object) => obj && obj.toString() === "[object Object]";
