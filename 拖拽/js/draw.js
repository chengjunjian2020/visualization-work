export class Draw {
  drawList = [];
  constructor(drawBox, draw) {
    if (!draw) {
      throw new Error("未传入draw参数");
    }
    if (draw.constructor === Array) {
      this.drawList = draw.map((drawItem) => new DrawItem(drawBox, drawItem));
    } else {
      this.drawList.push(new DrawItem(drawBox, draw));
    }
    this.bindDrawDown();
  }
  bindDrawDown() {
    window.onmousedown = () => {
      console.log(this.drawList);
      this.drawList.forEach((drawItem) => {
        drawItem.draw.style.zIndex = 0;
      });
    };
  }
}
export class DrawItem {
  drawBox;
  draw;
  mouse = {
    down: false,
    startX: 0,
    endY: 0,
    moveX: 0,
    moveY: 0,
    boundary: {}, //边界
  };
  constructor(drawBox, el = {}) {
    if (!drawBox.tagName) {
    }
    this.drawBox = drawBox;
    const draw = this.initDrawDom(drawBox, el);
    this.draw = draw;
    this.getDrawBoundary();
    this.initDrawPosition(draw, el.position, this.mouse);
    this.drawBindEvent();
  }
  //初始化位置
  initDrawPosition(draw, position = {}, mouse) {
    const { right, bottom } = mouse.boundary;
    const { x = 0, y = 0 } = position;
    const moveX = Math.max(Math.min(x, right), 0);
    const moveY = Math.max(Math.min(y, bottom), 0);
    this.mouse.startX = moveX;
    this.mouse.endY = moveY;
    draw.style.left = `${moveX}px`;
    draw.style.top = `${moveY}px`;
  }
  //初始化拖拽DOM信息
  initDrawDom(drawBox, el) {
    const { tagName = "div", className = "", style = {} } = el;
    const draw = document.createElement(tagName);
    draw.setAttribute("class", className);
    Object.keys(style).forEach((key) => {
      draw.style[key] = style[key];
    });
    draw.style.position = "absolute";
    drawBox.appendChild(draw);
    return draw;
  }
  //初始化mouse边界相关信息
  getDrawBoundary() {
    const { drawBox, mouse, draw } = this;
    const { top, left, right, bottom } = drawBox.getBoundingClientRect();
    const drawWidth = draw.offsetWidth;
    const drawHeight = draw.offsetHeight;
    mouse.boundary = {
      right: right - left - drawWidth - 2,
      bottom: bottom - top - drawHeight - 2,
    };
  }
  //绑定拖拽事件
  drawBindEvent() {
    const { draw } = this;
    draw.onmousedown = (event) => {
      this.calculateDown(event);
      //当存在多个实例时，绑定的函数会被覆盖每次鼠标按下事件回重新进行绑定
      window.onmousemove = (event) => {
        event.preventDefault();
        this.calculateMove(event);
      };
      window.onmouseup = (event) => {
        event.preventDefault();
        this.calculateUp(event);
      };
      window.onresize = () => {
        this.getDrawBoundary();
      };
    };
  }

  calculateDown(event) {
    const { mouse, draw } = this;

    const startX = event.x - mouse.startX;
    const endY = event.y - mouse.endY;
    const down = true;
    this.mouse = { ...mouse, startX, endY, down };
    setTimeout(() => {
      draw.style.zIndex = 1;
    });
  }
  calculateMove(event) {
    const { mouse, draw } = this;
    if (!mouse.down) {
      return;
    }
    const { right, bottom } = mouse.boundary;
    const moveX = Math.max(Math.min(event.x - mouse.startX, right), 0);
    const moveY = Math.max(Math.min(event.y - mouse.endY, bottom), 0);
    mouse.moveX = moveX;
    mouse.moveY = moveY;
    draw.style.left = `${moveX}px`;
    draw.style.top = `${moveY}px`;
  }
  calculateUp() {
    const { mouse } = this;
    if (!mouse.down) {
      return;
    }
    mouse.down = false;
    this.mouse = {
      ...mouse,
      startX: mouse.moveX,
      endY: mouse.moveY,
      moveX: 0,
      moveY: 0,
    };
  }
}
