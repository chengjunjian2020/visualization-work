export function mixins(curCls: any, obj: Record<string, Function>) {
	Object.keys(obj).forEach(key => {
		if (!curCls[key]) {
			curCls.prototype[key] = obj[key];
		}
	});
}
export const $ = (id: string): HTMLElement => {
	return document.querySelector(id);
};
