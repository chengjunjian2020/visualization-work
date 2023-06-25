import { isDom } from "./tool/is";
class Grender {
  layer = [];
  el;
  constructor(dom) {
    if (!dom || !isDom(dom)) {
      throw new Error("构造函数第一个参数应是dom");
    }
    this.el = dom;
  }
}
