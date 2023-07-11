import { IGrenderOps } from "/grender";
import { disableUserSelect } from "/tool/dom";

function createRoot(width: number, height: number) {
	const domRoot = document.createElement("div");

	// domRoot.onselectstart = returnFalse; // Avoid page selected
	domRoot.style.cssText =
		[
			"position:relative",
			// IOS13 safari probably has a compositing bug (z order of the canvas and the consequent
			// dom does not act as expected) when some of the parent dom has
			// `-webkit-overflow-scrolling: touch;` and the webpage is longer than one screen and
			// the canvas is not at the top part of the page.
			// Check `https://bugs.webkit.org/show_bug.cgi?id=203681` for more details. We remove
			// this `overflow:hidden` to avoid the bug.
			// 'overflow:hidden',
			"width:" + width + "px",
			"height:" + height + "px",
			"padding:0",
			"margin:0",
			"border-width:0",
		].join(";") + ";";

	return domRoot;
}
function createCanvas(options: IGrenderOps) {
	const canvas = document.createElement("canvas");
	const { width = 400, height = 500 } = options;
	canvas.width = width;
	canvas.height = height;
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	return canvas;
}
export class Painter {
	root: HTMLElement; //dom容器

	private wrapperDom: HTMLElement; //包裹canvas的容器

	private canvas: HTMLElement;
	constructor(root: HTMLElement, options: IGrenderOps) {
		this.initPainter(root, options);
	}
	initPainter(root: HTMLElement, options: IGrenderOps) {
		this.root = root;
		const rootStyle = root.style;
		if (rootStyle) {
			disableUserSelect(root);
			root.innerHTML = "";
		}
		const width = options.width || root.offsetWidth;
		const height = options.height || root.offsetHeight;
		const painterRoot = (this.wrapperDom = createRoot(width, height));
		root.appendChild(painterRoot);
		this.wrapperDom = painterRoot;
		const canvas = createCanvas({width,height});
		painterRoot.append(canvas);
		this.canvas = canvas;
	}
	getContainer(){
		return this.wrapperDom
	}
}
