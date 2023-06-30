export class Shape {
  listenerMap; //事件容器
  constructor() {
    this.listenerMap = new Map();
  }
  on(eventName, listener) {
    const { listenerMap } = this;
    if (listenerMap.has(eventName)) {
      listenerMap.get(eventName).push(listener);
    } else {
      listenerMap.set(eventName, [listener]);
    }
  }
  getMouse(evet) {
    return new Point2d(evet.offsetX, evet.offsetY);
  }
}
