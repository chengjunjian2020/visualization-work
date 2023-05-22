import { isDom, isArray } from "../../utils/index.js";
export class ScrollLoad {
  touch = {
    start: 0,
    targetTouches: null,
    scrollNumber: 0,
  };
  container; //外部容器
  content; //列表容器
  head; //头部容器（加载容器）
  // loadMore; //加载更多回调
  pullRefresh; //下拉刷新回调
  loading = false; //是否关闭loading状态
  constructor({ container, content, loadMore, pullRefresh }) {
    if (!isDom(container)) {
      throw new Error(`container不是一个dom`);
    }
    if (!isDom(content)) {
      throw new Error(`content不是一个dom`);
    }
    const head = this.createScrollHead(container, content);
    window.head = head;
    window.content = content;
    Object.assign(this, { container, content, loadMore, pullRefresh, head });
    this.listenerScroll();
    pullRefresh().then((data) => {
      this.addScrollData(data);
    });
  }
  createScrollHead(container, content) {
    const head = document.createElement("div");
    head.className = "pull-to-refresh-head";
    container.insertBefore(head, content);
    return head;
  }
  clearTouchState() {
    this.touch = {
      start: 0,
      scrollNumber: 0,
      targetTouches: null,
    };
  }
  getScrollMoveText(headHeight) {
    let text = "";
    if (headHeight < 50) {
      text = "下拉刷新";
    } else {
      text = "释放立即刷新";
    }
    return text;
  }
  getHeadHeight = (e) => {
    let headHeight = e.targetTouches[0].clientY - this.touch.start;
    this.touch.scrollNumber = headHeight;
    headHeight < 50 ? headHeight : 50 + (headHeight - 50) / 5;
    return headHeight;
  };
  loadingStartStyle(head) {
    head.style.height = `40px`;
    head.style.transition = `all 0.5s`;

    setTimeout(() => {
      head.style.transition = "none";
      head.innerText = "加载中...";
    }, 500);
  }
  loadingEndStyle(head) {
    head.style.transition = `all 0.7s`;
    head.style.height = `0px`;
    setTimeout(() => {
      head.style.transition = "none";
    }, 1000);
  }
  addScrollData(data) {
    if (!isArray(data)) {
      return;
    }
    const { content } = this;
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "pull-to-refresh-item";
      div.innerText = item.text;
      content.insertBefore(div, content.children[0]);
    });
  }
  touchStart = (e) => {
    this.touch.targetTouches = e.targetTouches;
    this.touch.start = e.targetTouches[0].clientY;
  };
  touchMove = (e) => {
    if (!this.touch.targetTouches) {
      return;
    }
    const { head, touch } = this;
    let headHeight = this.getHeadHeight(e);
    //判断如果是上拉则结束
    if (headHeight <= 0) {
      this.clearTouchState();
      return;
    }
    e.preventDefault();
    let text = this.getScrollMoveText(headHeight);
    head.style.height = `${headHeight}px`;
    head.innerText = text;
  };
  touchEnd = (e) => {
    const { head, pullRefresh, touch } = this;
    if (!touch.targetTouches) {
      return;
    }
    e.preventDefault();
    this.clearTouchState();
    this.loadingStartStyle(head);
    pullRefresh &&
      pullRefresh().then((data) => {
        this.loadingEndStyle(head);
        this.addScrollData(data);
      });
  };
  listenerScroll() {
    const { container } = this;
    container.addEventListener("touchstart", this.touchStart, true);
    container.addEventListener("touchmove", this.touchMove, true);
    container.addEventListener("touchend", this.touchEnd, true);
  }
}
