import { Vector2 } from "../math/Vector2";
import { Polylline } from "../shape/Polyline";
import { Rect } from "../shape/Rect";

export class Data {

  public rectList: Rect[] = []
  public polylineList: Polylline[] = [];

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private offset: Vector2 = new Vector2()
  private scale = 1;

  private half = new Vector2()

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    this.half.x = this.canvas.width / 2
    this.half.y = this.canvas.height / 2
    const jsonString = localStorage.getItem("editor-data")
    if (jsonString) {
      const obj = JSON.parse(jsonString)
      Object.assign(this, obj)
      this.rectList = this.rectList.map(e => new Rect(e.points))
      this.polylineList = this.polylineList.map(e => new Rect(e.points))
      this.renderAll()
    }
  }


  getOffset() {
    return this.offset
  }

  setOffset(x: number, y: number) {
    this.offset.x = x
    this.offset.y = y
    this.renderAll()
  }

  renderAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.rectList.forEach(this.renderRect.bind(this))
    this.polylineList.forEach(this.renderPolyline.bind(this))
  }

  private renderRect(rect: Rect) {
    this.ctx.strokeStyle = "#333333"
    this.ctx.beginPath()
    rect.points.forEach((v: Vector2, index: number) => {
      v.computeScale(this.half, this.offset, this.scale)
      index === 0 ? this.ctx.moveTo(v.x, v.y) : this.ctx.lineTo(v.x, v.y)
    })
    this.ctx.stroke()
  }

  private renderPolyline(polyline: Polylline) {
    this.ctx.beginPath();
    polyline.points.forEach((v: Vector2, index: number) => {
      v.computeScale(this.half, this.offset, this.scale)
      index === 0 ? this.ctx.moveTo(v.x, v.y) : this.ctx.lineTo(v.x, v.y)
    })
    this.ctx.stroke()
  }

  public getHalf() {
    return this.half
  }

  public getScale() {
    return this.scale
  }

  public setScale(val: number) {
    this.scale = val
    this.renderAll()
  }

  public computeScale(x: number, y: number) {
    const width = this.canvas.width / 2
    const height = this.canvas.height / 2
    return {
      x: (x - width) * this.scale + width,
      y: (y - height) * this.scale + height
    }
  }

  // 缩放后坐标还原
  public reverseScale(x: number, y: number) {
    const width = this.canvas.width / 2
    const height = this.canvas.height / 2
    return {
      x: (x - width) / this.scale + width,
      y: (y - height) / this.scale + height
    }
  }

  persist() {
    localStorage.setItem("editor-data", this.toJSON())
  }

  toJSON() {
    const obj = {
      rectList: this.rectList,
      polylineList: this.polylineList
    }
    return JSON.stringify(obj)
  }

}