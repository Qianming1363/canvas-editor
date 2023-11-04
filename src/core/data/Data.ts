import { Polylline } from "../shape/Polyline";
import { Rect } from "../shape/Rect";

export class Data {

  public rectList: Rect[] = []
  public polylineList: Polylline[] = [];

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private offsetX = 0;
  private offsetY = 0;

  private scale = 1;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    const jsonString = localStorage.getItem("editor-data")
    if (jsonString) {
      const obj = JSON.parse(jsonString)
      Object.assign(this, obj)
      this.renderAll()
    }
  }


  getOffset() {
    return {
      x: this.offsetX,
      y: this.offsetY
    }
  }

  setOffset(x: number, y: number) {
    this.offsetX = x
    this.offsetY = y
    this.renderAll()
  }

  renderAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.rectList.forEach(this.renderRect.bind(this))
    this.polylineList.forEach(this.renderPolyline.bind(this))
  }

  private renderRect(rect: Rect) {
    this.ctx.strokeStyle = "#333333"
    this.ctx.lineWidth = 2 * this.scale
    let startX = rect.startX + this.offsetX
    let startY = rect.startY + this.offsetY
    let width = rect.endX - rect.startX
    let height = rect.endY - rect.startY
    let { x: sx, y: sy } = this.computeScale(startX, startY)
    this.ctx.strokeRect(sx, sy, width * this.scale, height * this.scale)
  }

  private renderPolyline(polyline: Polylline) {
    this.ctx.beginPath();
    this.ctx.moveTo(polyline.points[0], polyline.points[1]);
    for (let i = 1; i < polyline.points.length / 2; i++) {
      this.ctx.lineTo(polyline.points[i * 2], polyline.points[i * 2 + 1])
    }
    this.ctx.stroke()
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