export function mixins(curCls: any, obj: Record<string, Function>) {
	Object.keys(obj).forEach(key => {
		curCls.prototype[key] = obj[key];
	});
}
