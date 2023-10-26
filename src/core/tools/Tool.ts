import { Data } from "../data/Data";

export class Tool {
  protected ctx: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;
  protected data: Data;
  private img = new Image()
  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: Data) {
    this.ctx = ctx
    this.canvas = canvas
    this.data = data
  }

  public mouseDown(e: MouseEvent) {
    console.log(e)
  }

  public mouseMove(e: MouseEvent) {
    console.log(e)
  }

  public mouseUp(e: MouseEvent) {
    console.log(e)
  }

  public saveImg() {
    this.img.src = this.canvas.toDataURL()
  }

  public drawImg() {
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height)
  }


}