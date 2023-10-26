import { Data } from "../data/Data";
import { Rect } from "../shape/Rect";
import { Tool } from "./Tool";

export class RectDrawTool extends Tool {

  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private isDraw = false

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: Data) {
    super(ctx, canvas, data)
  }

  public mouseDown = (e: MouseEvent) => {
    e.preventDefault()
    this.startX = e.clientX
    this.startY = e.clientY
    this.isDraw = true
    super.saveImg()
  }

  public mouseMove = (e: MouseEvent) => {
    if (!this.isDraw) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    super.drawImg()
    this.endX = e.clientX
    this.endY = e.clientY
    this.ctx.strokeStyle = "#333333"
    this.ctx.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
  }

  public mouseUp = (e: MouseEvent) => {
    // 保存数据，结束绘制
    this.isDraw = false
    this.data.rectList.push(new Rect(this.startX, this.startY, this.endX, this.endY))
    this.data.renderAll()
    this.data.persist()
  }

}