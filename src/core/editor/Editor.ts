import { DataManager, State } from './../data/DataManager';
import { DragControl } from "../control/DragControl"
import { PolylineDrawTool } from "../tools/PolylineDrawTool"
import { RectDrawTool } from "../tools/RectDrawTool"
import { Mode } from "./Mode"
import { ActionRecord } from '../data/ActionRecord';
import { EventName, on } from '../event/EventManager';
import { Selector } from '../selector/Selector';
export class Editor {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  private rectDrawTool: RectDrawTool | undefined
  private dataManager: DataManager | undefined;
  private dragControl: DragControl | undefined
  private polylineDrawTool: PolylineDrawTool | undefined
  private actionRecord: ActionRecord = new ActionRecord()

  private selector: Selector | undefined

  private mode: Mode = Mode.BROWSE

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    if (this.ctx) {
      this.dataManager = new DataManager(this.ctx, this.canvas)
      this.rectDrawTool = new RectDrawTool(this.ctx, this.canvas, this.dataManager)
      this.polylineDrawTool = new PolylineDrawTool(this.ctx, this.canvas, this.dataManager)
      this.dragControl = new DragControl(this.dataManager)
      this.selector = new Selector(this.canvas, this.dataManager)
      this.initMouseEvenet()
      this.initEditorEvent()
    }
  }

  initMouseEvenet() {
    this.canvas.addEventListener("mousedown", (e: MouseEvent) => {
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
    this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
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
    this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
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

  initEditorEvent() {
    on(EventName.DrawEnd, () => {
      const res = this.dataManager?.toJSON()
      res && this.actionRecord.addRecord(res)
    })
  }

  public setData(state: State, isSave = true) {
    this.dataManager?.setState(state)
    isSave && this.actionRecord.addRecord(JSON.stringify(state))
  }

  public clear() {
    if (this.dataManager) {
      this.dataManager.clearState()
      this.actionRecord.addRecord(this.dataManager.toJSON())
    }
  }

  public setDrawMode(mode: Mode) {
    this.mode = mode
  }


  public back() {
    const data = this.actionRecord.backRecord()
    data && this.setData(JSON.parse(data), false)
  }


  public cancelBack() {
    const data = this.actionRecord.cancelBackRecord()
    data && this.setData(JSON.parse(data), false)
  }


}