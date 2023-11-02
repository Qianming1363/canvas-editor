import { DragControl } from "../control/DragControl"
import { Data } from "../data/Data"
import { PolylineDrawTool } from "../tools/ PolylineDrawTool"
import { RectDrawTool } from "../tools/RectDrawTool"

export class Editor {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  private rectDrawTool: RectDrawTool | undefined
  private data: Data | undefined;
  private dragControl: DragControl | undefined
  private polylineDrawTool: PolylineDrawTool | undefined

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    if (this.ctx) {
      this.data = new Data(this.ctx, this.canvas)
      this.rectDrawTool = new RectDrawTool(this.ctx, this.canvas, this.data)
      this.polylineDrawTool = new PolylineDrawTool(this.ctx, this.canvas, this.data)
      this.dragControl = new DragControl(this.data)
      this.initMouseEvenet()
    }
  }

  initMouseEvenet() {
    document.body.addEventListener("mousedown", (e: MouseEvent) => {
      // this.rectDrawTool?.mouseDown(e)
      this.polylineDrawTool?.mouseDown(e)
      this.dragControl?.mouseDown(e)
    })
    document.body.addEventListener("mousemove", (e: MouseEvent) => {
      // this.rectDrawTool?.mouseMove(e)
      this.polylineDrawTool?.mouseMove(e)
      this.dragControl?.mouseMove(e)
    })
    document.body.addEventListener("mouseup", (e: MouseEvent) => {
      // this.rectDrawTool?.mouseUp(e)
      this.polylineDrawTool?.mouseUp(e)
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