
export default class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(x, y) {
    return x === this.x && y === this.y;
  }
}