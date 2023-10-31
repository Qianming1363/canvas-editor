import { Rect } from "../shape/Rect";

export class Data {

  public rectList: Rect[] = []

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
      this.rectList = obj.rectList
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
    this.rectList.forEach((rect: Rect) => {
      this.ctx.strokeStyle = "#333333"
      this.ctx.lineWidth = 2 * this.scale
      let startX = rect.startX + this.offsetX
      let startY = rect.startY + this.offsetY
      let width = rect.endX - rect.startX
      let height = rect.endY - rect.startY
      let { x: sx, y: sy } = this.computeScale(startX, startY)
      // let { x: w, y: h } = this.computeScale(width, height)
      this.ctx.strokeRect(sx, sy, width * this.scale, height * this.scale)
    })
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
      rectList: this.rectList
    }
    return JSON.stringify(obj)
  }

}