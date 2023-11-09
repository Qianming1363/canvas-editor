import { Vector2 } from "../math/Vector2";
import { BaseShape } from "../shape/BaseShape";
import { Polylline } from "../shape/Polyline";
import { Rect } from "../shape/Rect";

export interface State {
  rectList: Rect[],
  polylineList: Polylline[]
}
export type StateKey = keyof State



export class DataManager {

  private state: State = {
    rectList: [],
    polylineList: []
  }

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private offset: Vector2 = new Vector2()
  private scale = 1;
  private half = new Vector2()

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    this.half.x = this.canvas.width / 2
    this.half.y = this.canvas.height / 2
  }

  setState(state: State) {
    state.rectList = state.rectList.map(e => new Rect(e.points))
    state.polylineList = state.polylineList.map(e => new Polylline(e.points))
    this.state = state
    this.renderAll()
  }

  public clearState() {
    Object.keys(this.state).forEach((key) => this.state[key as StateKey] = [])
    this.renderAll()
  }

  public getHalf() {
    return this.half
  }

  public getScale() {
    return this.scale
  }

  public setScale(val: number) {
    this.scale = val
    this.renderAll()
  }

  public getOffset() {
    return this.offset
  }

  public setOffset(x: number, y: number) {
    this.offset.x = x
    this.offset.y = y
    this.renderAll()
  }

  public getViewParams() {
    return {
      half: this.half,
      offset: this.offset,
      scale: this.scale
    }
  }

  public addShape(key: StateKey, data: any) {
    this.state[key].push(data)
  }

  renderAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.state.rectList.forEach(item => item.render(this.ctx, this.getViewParams()))
    this.state.polylineList.forEach(item => item.render(this.ctx, this.getViewParams()))
  }


  persist() {

  }

  toJSON() {
    const data = Object.keys(this.state).reduce((pre: any, cur: any) => {
      pre[cur] = this.state[cur as StateKey].map((e: any) => e.toJSON()) as BaseShape[]
      return pre
    }, {} as Record<StateKey, BaseShape[]>)
    return JSON.stringify(data)
  }

}