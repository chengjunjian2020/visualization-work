let current = 0;
export class Point2d {
	x;
	y;
	id;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.id = ++current;
	}
	clone() {
		return new Point2d(this.x, this.y);
	}
	equal(v: { x: number; y: number }) {
		return this.x === v.x && this.y === v.y;
	}
	distance(p: Point2d) {
		const [x, y] = this.clone().sub(p).abs();
		return x * x + y * y;
	}
	sub(v: Point2d) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	abs() {
		return [Math.abs(this.x), Math.abs(this.y)];
	}
	multiplyScalar(scalar: number) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	add(v: { x: number; y: number }) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
}
