export function disableUserSelect(dom: HTMLElement) {
	const domStyle = dom.style;
	domStyle.webkitUserSelect = "none";
	domStyle.userSelect = "none";
	// @ts-ignore
	domStyle.webkitTapHighlightColor = "rgba(0,0,0,0)";
	(domStyle as any)["-webkit-touch-callout"] = "none";
}
