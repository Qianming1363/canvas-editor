import { Rect } from "../shape/Rect";

export class Data {

  public rectList: Rect[] = []

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private offsetX = 0;
  private offsetY = 0;

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
    this.ctx.clearRect(-10000, -10000, this.canvas.width * 100, this.canvas.height * 100)
    this.rectList.forEach((rect: Rect) => {
      this.ctx.strokeStyle = "#333333"
      this.ctx.strokeRect(rect.startX + this.offsetX, rect.startY + this.offsetY, rect.endX - rect.startX, rect.endY - rect.startY)
    })
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