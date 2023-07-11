import { Graphic } from "./graphic/type";

export default class DataStorage {
	private shapeList: Graphic[];
	constructor() {
		this.shapeList = [];
	}
	getData() {
		return this.shapeList;
	}
	addShape<T extends Graphic>(shape: T) {
		this.shapeList.push(shape);
	}
	delShape<T extends Graphic>(shape: T) {
		const delIndex = this.shapeList.findIndex(shapes => shapes === shape);
		if (delIndex < 0) {
			return;
		}
		this.shapeList.splice(delIndex, 1);
	}
}
