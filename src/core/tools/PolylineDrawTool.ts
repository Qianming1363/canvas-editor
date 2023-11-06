import { Tool } from "./Tool";
import { Data } from "../data/Data";
import { Polylline } from "../shape/Polyline";
import { Vector2 } from "../math/Vector2";


export class PolylineDrawTool extends Tool {

  private points: Vector2[] = [];
  private currentX = 0;
  private currentY = 0;
  private isDrawing = false

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: Data) {
    super(ctx, canvas, data)
  }

  public mouseDown = (e: MouseEvent) => {
    if (e.button === 2) {
      this.isDrawing = false
      return
    }
    this.isDrawing = true

    this.currentX = e.clientX
    this.currentY = e.clientY
    if (this.points.length === 0) {
      this.points.push(new Vector2(e.clientX, e.clientY))
      this.saveImg()
    }
  }


  public mouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return
    let x = e.clientX
    let y = e.clientY
    if (this.points.length < 2) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawImg()
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    this.ctx.lineTo(x, y);
    this.ctx.stroke()
  }

  public mouseUp = (e: MouseEvent) => {
    if (e.button === 2) {
      this.isDrawing = false
      const half = this.data.getHalf()
      const scale = this.data.getScale()
      const offset = this.data.getOffset()
      this.points = this.points.map(p => {
        p.reverseScale(half, offset, scale)
        return new Vector2(p.x, p.y)
      })
      this.data.polylineList.push(new Polylline(this.points))
      this.points = []
      this.data.renderAll()
      this.data.persist()
      return
    }
    if (this.points.length !== 0) {
      this.points.push(new Vector2(e.clientX, e.clientY))
    }
  }



}