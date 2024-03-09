import { Vector2 } from "../math/Vector2"
import { BaseShape, ShapeType } from "./BaseShape"
import { v4 as uuid } from "uuid"
export class Rect {

  public points: Vector2[]
  public controlPoints: Vector2[]
  private id = uuid()
  private type: ShapeType = ShapeType.RECT

  private isActive = false;
  private isSelected = false

  constructor(data: Vector2[] | BaseShape) {
    if (data instanceof Array) {
      this.points = data.map((e) => new Vector2(e.x, e.y))
    } else {
      this.points = data.points.map(e => new Vector2(e.x, e.y))
      this.id = data.id
      this.type = data.type
    }
  }

  public getIsActive() {
    return this.isActive
  }

  public active() {
    this.isActive = true
  }

  public deactive() {
    this.isActive = false
  }

  public getIsSelected() {
    return this.isSelected
  }

  public select() {
    this.isSelected = true
  }

  public unSelect() {
    this.isSelected = false
  }

  public set(e: any) {
    Object.assign(this, e)
    return this
  }

  render(ctx: CanvasRenderingContext2D, params: { half: Vector2, offset: Vector2, scale: number }) {

    const needActive = this.isActive || this.isSelected

    ctx.strokeStyle = needActive ? "#FF00FF" : "#333333"
    ctx.lineWidth = needActive ? 2 : 1
    ctx.beginPath()
    const points = [...this.points, this.points[0]]
    points.forEach((v: Vector2, index: number) => {
      v.computeScale(params.half, params.offset, params.scale)
      index === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
    })
    ctx.stroke()

    if (needActive) {
      // 绘制控制点
    }

  }

  click() {
    
  }


  toJSON() {
    return {
      id: this.id,
      points: this.points.map(e => e.toJSON()),
      type: this.type
    }
  }


  setFrom13() {

    // this.points[this]


  }

  setFrom24() {

  }

  // 计算控制点，激活的时候渲染
  computeControlPoints() {
    
  }

  setPointsFromControlPoints() {

  }



}