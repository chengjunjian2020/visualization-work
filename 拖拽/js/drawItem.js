class draw {
  drawBox = null;
  draw = null;
  mouse = {
    down: false,
    startX: 0,
    endY: 0,
    moveX: 0,
    moveY: 0,
    boundary: {}, //边界
  };
  constructor(container, el, position) {
    this.drawBox = document.querySelector(container);
    // this.draw = document.getElementById("draw");
    if (!drawBox) {
      throw new Error("传入的父节点找不到");
    }

    this.getDrawBoundary();
    //TODO后面设置位置信息
  }
  getDrawBoundary() {
    const { drawBox, draw } = this;
    const { top, left, right, bottom } = drawBox.getBoundingClientRect();
    const drawWidth = draw.offsetWidth;
    const drawHeight = draw.offsetHeight;
    this.mouse.boundary = {
      right: right - left - drawWidth,
      bottom: bottom - top - drawHeight,
    };
  }
}
