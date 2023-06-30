current;
export class Point2d {
  x;
  y;
  id;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = ++current;
  }
  distance(p) {
    const [x, y] = this.clone().sub(p).abs();
    return x * x + y * y;
  }
}
