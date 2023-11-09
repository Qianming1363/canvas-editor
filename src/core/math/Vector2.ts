export class Vector2 {

  // 显示的坐标
  public x = 0;
  public y = 0;
  // 原始坐标
  public px = 0;
  public py = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
  }

  add(v: Vector2) {
    this.x = this.x + v.x
    this.y = this.y + v.y
    return this
  }

  sub(v: Vector2) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    return this
  }

  reset() {
    this.x = this.px
    this.y = this.py
  }

  computeScale(half: Vector2, offset: Vector2, scale: number) {
    this.x = (this.px + offset.x - half.x) * scale + half.x
    this.y = (this.py + offset.y - half.y) * scale + half.y
    return this
  }

  reverseScale(half: Vector2, offset: Vector2, scale: number) {
    if (this.px === 0 && this.py === 0) {
      this.px = this.x
      this.py = this.y
    }
    this.x = ((this.px - offset.x * scale) - half.x) / scale + half.x
    this.y = ((this.py - offset.y * scale) - half.y) / scale + half.y
    return this;
  }

  toArray() {
    return [this.x, this.y]
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y
    }
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

}