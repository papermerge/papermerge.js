

export default class Rectangle {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = parseInt(width);
    this.height = parseInt(height);
  }

  intersect(rect) {
    /*
    Returns true if this rectangle intersects with rect.
    Two rectangle intersect if one of them has a point inside other.
    */
    if (this.contains_point(rect.x, rect.y)) {
      return true;
    }

    if (this.contains_point(rect.x + rect.width, rect.y)) {
      return true;
    }

    if (this.contains_point(rect.x + rect.width, rect.y + rect.height)) {
      return true;
    }

    if (this.contains_point(rect.x, rect.y + rect.height)) {
      return true;
    }

    return false;
  }

  contains_point(x, y) {
    /*
      Is point (x, y) inside this rectangle ?
    */
    let x_is_within = false, y_is_within = false;


    if (this.x <= x && x <= this.x + this.width) {
      x_is_within = true;
    }

    if (this.y <= y && y <= this.y + this.height) {
      y_is_within = true;
    }

    return x_is_within && y_is_within;
  }

  toString() {
    return `Rectangle(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`
  }
}
