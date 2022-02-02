
export default class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(point) {
    return point.x === this.x && point.y === this.y;
  }
}