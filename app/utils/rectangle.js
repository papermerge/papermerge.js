import Point from 'papermerge/utils/point';


function intersect(rectA, rectB) {
  let rectA_X1 = rectA.p1.x,
      rectA_Y1 = rectA.p1.y,
      rectA_X2 = rectA.p3.x,
      rectA_Y2 = rectA.p3.y,
      rectB_X1 = rectB.p1.x,
      rectB_Y1 = rectB.p1.y,
      rectB_X2 = rectB.p3.x,
      rectB_Y2 = rectB.p3.y;

  if ((rectA_X1 <= rectB_X2) && (rectA_X2 >= rectB_X1) && (rectA_Y1 <= rectB_Y2) && (rectA_Y2 >= rectB_Y1)) {
    return true;
  }

  return false;
}


export default class Rectangle {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = parseInt(width);
    this.height = parseInt(height);

    this.p1 = new Point(this.x, this.y);
    this.p2 = new Point(this.x + this.width, this.y);
    this.p3 = new Point(this.x + this.width, this.y + this.height);
    this.p4 = new Point(this.x, this.y + this.height);
  }

  intersect(rect) {
    return intersect(rect, this) || intersect(this, rect);
  }

  contains_point(x, y) {
    /*
      returns true if coord (x, y) is within boundries of the rectangle
    */
    let is_within_x = this.x <= x && x <= this.x + this.width,
        is_within_y = this.y <= y && y <= this.y + this.height;

      return is_within_x && is_within_y;
  }

  toString() {
    return `Rectangle(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`
  }
}
