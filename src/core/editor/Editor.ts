import { DragControl } from "../control/DragControl"
import { Data } from "../data/Data"
import { RectDrawTool } from "../tools/RectDrawTool"

export class Editor {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  private rectDrawTool: RectDrawTool | undefined
  private data: Data | undefined;
  private dragControl: DragControl | undefined

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    if (this.ctx) {
      this.data = new Data(this.ctx, this.canvas)
      this.rectDrawTool = new RectDrawTool(this.ctx, this.canvas, this.data)
      this.dragControl = new DragControl(this.data)
    }
  }

  initMouseEvenet() {
    document.body.addEventListener("mousedown", (e: MouseEvent) => {
      this.rectDrawTool?.mouseDown(e)
      this.dragControl?.mouseDown(e)
    })
    document.body.addEventListener("mousemove", (e: MouseEvent) => {
      this.rectDrawTool?.mouseMove(e)
      this.dragControl?.mouseMove(e)
    })
    document.body.addEventListener("mouseup", (e: MouseEvent) => {
      this.rectDrawTool?.mouseUp(e)
      this.dragControl?.mouseUp(e)
    })

    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
    })


  }

  clear() {
    if (this.data) {
      localStorage.setItem("editor-data", '')
      this.data.rectList = []
      this.data.renderAll()
    }
  }

}