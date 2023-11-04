import { Tool } from "./Tool";
import { Data } from "../data/Data";
import { Polylline } from "../shape/Polyline";


export class PolylineDrawTool extends Tool {

  private points: number[] = [];
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
      this.points.push(this.currentX, this.currentY)

    }
    this.saveImg()
  }


  public mouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return
    let x = e.clientX
    let y = e.clientY
    if (this.points.length < 2) return
    this.ctx.clearRect(0, 0, 5000, 5000)
    this.drawImg()
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0], this.points[1]);
    for (let i = 1; i < this.points.length / 2; i++) {
      this.ctx.lineTo(this.points[i * 2], this.points[i * 2 + 1])
    }
    this.ctx.lineTo(x, y);
    this.ctx.stroke()
  }

  public mouseUp = (e: MouseEvent) => {
    this.currentX = e.clientX
    this.currentY = e.clientY
    if (e.button === 2) {
      this.isDrawing = false
      this.data.polylineList.push(new Polylline(this.points))
      this.points = []
      this.data.renderAll()
      this.data.persist()
      return
    }
    if (this.points.length !== 0) {
      this.points.push(this.currentX, this.currentY)
    }
  }



}