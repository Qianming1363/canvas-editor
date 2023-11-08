import { Vector2 } from "../math/Vector2"

export class Rect {

  public points: Vector2[]

  constructor(points: Vector2[]) {
    this.points = points.map((e: Vector2 | any) => {
      if (e instanceof Vector2) {
        return new Vector2(e.x, e.y)
      } else {
        return new Vector2(e.px, e.py)
      }
    })
  }

  public set(e: any) {
    Object.assign(this, e)
    return this
  }

  render(ctx: CanvasRenderingContext2D, params: { half: Vector2, offset: Vector2, scale: number }) {
    ctx.strokeStyle = "#333333"
    ctx.beginPath()
    this.points.forEach((v: Vector2, index: number) => {
      v.computeScale(params.half, params.offset, params.scale)
      index === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
    })
    ctx.stroke()
  }


}