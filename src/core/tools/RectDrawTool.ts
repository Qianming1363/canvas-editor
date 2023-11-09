import { Data } from "../data/DataManager";
import { EventName, emit } from "../event/EventManager";
import { Vector2 } from "../math/Vector2";
import { Rect } from "../shape/Rect";
import { Tool } from "./Tool";

export class RectDrawTool extends Tool {

  private startPoint = new Vector2();
  private points: Vector2[] = []
  private isDraw = false

  private isMove = false

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: Data) {
    super(ctx, canvas, data)
  }

  public mouseDown = (e: MouseEvent) => {
    e.preventDefault()
    if (e.button !== 0) return
    this.startPoint.x = e.clientX
    this.startPoint.y = e.clientY
    this.isDraw = true
    super.saveImg()
  }

  public mouseMove = (e: MouseEvent) => {
    if (!this.isDraw) return
    this.isMove = true
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    super.drawImg()
    const end = new Vector2(e.clientX, e.clientY)
    const points = this.getRectPoints(this.startPoint, end)
    this.ctx.strokeStyle = "#333333"
    this.ctx.beginPath()
    points.forEach((v: Vector2, index: number) => {
      index === 0 ? this.ctx.moveTo(v.x, v.y) : this.ctx.lineTo(v.x, v.y)
    })
    this.points = points;
    this.ctx.stroke()
  }

  public mouseUp = (e: MouseEvent) => {
    // 保存数据，结束绘制
    if (!this.isDraw) return
    this.isDraw = false
    if (!this.isMove) return
    this.isMove = false

    const half = this.data.getHalf()
    const scale = this.data.getScale()
    const offset = this.data.getOffset()
    this.points = this.points.map(p => {
      p.reverseScale(half, offset, scale)
      return new Vector2(p.x, p.y)
    })
    this.data.addShape("rectList", new Rect(this.points))
    this.data.renderAll()
    this.data.persist()
    this.points = []
    this.startPoint = new Vector2()
    emit(EventName.DrawEnd)
  }


  private getRectPoints(v1: Vector2, v2: Vector2) {
    return [v1, new Vector2(v2.x, v1.y), v2, new Vector2(v1.x, v2.y), v1]
  }

}