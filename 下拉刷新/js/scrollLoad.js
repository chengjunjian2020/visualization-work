import { isDom } from "../../utils/index.js";
export class ScrollLoad {
  touch = {
    start: 0,
    targetTouches: null,
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
    Object.assign(this, { container, content, loadMore, pullRefresh, head });
    this.listenerScroll();
  }
  createScrollHead(container, content) {
    const head = document.createElement("div");
    head.className = "pull-to-refresh-head";
    container.insertBefore(head, content);
    return head;
  }
  listenerScroll() {
    const { container, content, touch } = this;
    content.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.touch.targetTouches = e.targetTouches;
        this.touch.start = e.targetTouches[0].clientY;
      },
      true
    );
    content.addEventListener(
      "touchmove",
      (e) => {
        console.log(e);
        if (!this.touch.targetTouches) {
          return;
        }
        const { touch, head } = this;

        let headHeight = e.targetTouches[0].clientY - this.touch.start;
        headHeight = headHeight < 50 ? headHeight : 50 + (headHeight - 50) / 5;
        let text = "";
        if (headHeight < 50) {
          text = "下拉刷新";
        } else {
          text = "释放立即刷新";
        }
        head.style.height = `${headHeight}px`;
        head.innerText = text;
      },
      true
    );
    content.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        const { head, pullRefresh } = this;
        this.touch = {
          start: 0,
          targetTouches: null,
        };
        head.innerText = "加载中...";
        head.style.height = `40px`;
        head.style.transition = `all 0.7s`;
        setTimeout(() => {
          head.style.transition = "none";
        }, 1000);
        pullRefresh &&
          pullRefresh().then((res) => {
            head.style.transition = `all 0.7s`;
            head.style.height = `0px`;
            setTimeout(() => {
              head.style.transition = "none";
            }, 1000);
          });
      },
      true
    );
  }
}
