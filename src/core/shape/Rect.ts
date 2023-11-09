import { Vector2 } from "../math/Vector2"
import { BaseShape, ShapeType } from "./BaseShape"
import { v4 as uuid } from "uuid"
export class Rect {

  public points: Vector2[]
  private id = uuid()
  private type: ShapeType = ShapeType.RECT

  constructor(data: Vector2[] | BaseShape) {
    if (data instanceof Array) {
      this.points = data.map((e) => new Vector2(e.x, e.y))
    } else {
      this.points = data.points.map(e => new Vector2(e.x, e.y))
      this.id = data.id
      this.type = data.type
    }
  }

  public set(e: any) {
    Object.assign(this, e)
    return this
  }

  render(ctx: CanvasRenderingContext2D, params: { half: Vector2, offset: Vector2, scale: number }) {
    ctx.strokeStyle = "#333333"
    ctx.beginPath()
    const points = [...this.points, this.points[0]]
    points.forEach((v: Vector2, index: number) => {
      v.computeScale(params.half, params.offset, params.scale)
      index === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
    })
    ctx.stroke()
  }


  toJSON() {
    return {
      id: this.id,
      points: this.points.map(e => e.toJSON()),
      type: this.type
    }
  }

}