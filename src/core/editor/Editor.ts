import { Data } from "../data/Data"
import { RectDrawTool } from "../tools/RectDrawTool"

export class Editor {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  private rectDrawTool: RectDrawTool | undefined
  private data: Data | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    if (this.ctx) {
      this.data = new Data(this.ctx, this.canvas)
      this.rectDrawTool = new RectDrawTool(this.ctx, this.canvas, this.data)
    }
  }

  initMouseEvenet() {
    document.body.addEventListener("mousedown", (e: MouseEvent) => {
      this.rectDrawTool?.mouseDown(e)
    })
    document.body.addEventListener("mousemove", (e: MouseEvent) => {
      this.rectDrawTool?.mouseMove(e)
    })
    document.body.addEventListener("mouseup", (e: MouseEvent) => {
      this.rectDrawTool?.mouseUp(e)
    })
  }

  clear() {
    if (this.data) {
      this.data.rectList = []
      this.data.renderAll()
    }
  }

}