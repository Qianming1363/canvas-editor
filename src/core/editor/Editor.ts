import { DragControl } from "../control/DragControl"
import { Data } from "../data/Data"
import { PolylineDrawTool } from "../tools/PolylineDrawTool"
import { RectDrawTool } from "../tools/RectDrawTool"
import { Mode } from "./Mode"

export class Editor {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  private rectDrawTool: RectDrawTool | undefined
  private data: Data | undefined;
  private dragControl: DragControl | undefined
  private polylineDrawTool: PolylineDrawTool | undefined

  private mode: Mode = Mode.BROWSE

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
      switch (this.mode) {
        case Mode.RECT:
          this.rectDrawTool?.mouseDown(e)
          break;
        case Mode.POLYLINE:
          this.polylineDrawTool?.mouseDown(e)
          break;
      }
      this.dragControl?.mouseDown(e)
    })
    document.body.addEventListener("mousemove", (e: MouseEvent) => {
      switch (this.mode) {
        case Mode.RECT:
          this.rectDrawTool?.mouseMove(e)
          break;
        case Mode.POLYLINE:
          this.polylineDrawTool?.mouseMove(e)
          break;
      }
      this.dragControl?.mouseMove(e)
    })
    document.body.addEventListener("mouseup", (e: MouseEvent) => {
      switch (this.mode) {
        case Mode.RECT:
          this.rectDrawTool?.mouseUp(e)
          break;
        case Mode.POLYLINE:
          this.polylineDrawTool?.mouseUp(e)
          break;
      }
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
      this.data.polylineList = []
      this.data.renderAll()
    }
  }

  public setDrawMode(mode: Mode) {
    this.mode = mode
    console.log("设置mode为：", this.mode)
  }

}