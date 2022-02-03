import Point from 'papermerge/utils/point';


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
    /*
    Returns true if this rectangle intersects with rect.
    Two rectangle intersect if one of them has a point inside other.
    */
    if (this.contains_point(rect.p1)) {
      return true;
    }

    if (this.contains_point(rect.p2)) {
      return true;
    }

    if (this.contains_point(rect.p3)) {
      return true;
    }

    if (this.contains_point(rect.p4)) {
      return true;
    }

    return false;
  }

  contains_point(point) {
    /*
      Is point (x, y) inside this rectangle ?
    */
    let x_is_within = false, y_is_within = false;


    if (this.x <= point.x && point.x <= this.x + this.width) {
      x_is_within = true;
    }

    if (this.y <= point.y && point.y <= this.y + this.height) {
      y_is_within = true;
    }

    return x_is_within && y_is_within;
  }

  toString() {
    return `Rectangle(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`
  }
}
