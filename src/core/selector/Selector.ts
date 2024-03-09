import { DataManager } from "../data/DataManager"
import { Vector2 } from "../math/Vector2";
import { Rect } from "../shape/Rect";

export class Selector {

  private enable = true
  private data: DataManager;
  private currentPoint: Vector2 = new Vector2()

  constructor(canvas: HTMLCanvasElement, data: DataManager) {
    this.data = data
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.enable && this.mouseMove(e)
    })
  }

  // 每次进行检测，判断当前选中图形

  mouseMove(e: MouseEvent) {
    // const params = this.data.getViewParams()

    //.computeScale(params.half, params.offset, params.scale)
    this.currentPoint = new Vector2(e.clientX, e.clientY)
    const state = this.data.getState()
    const rectList = state.rectList
    const res = this.checkRect(rectList)
    if (res) {
      rectList.forEach(e => e.deactive())
      res.forEach(e => e.active())
      this.data.renderAll()
    }
    this.checkControlPoints(rectList.flatMap(e => e.controlPoints))
  }

  checkClick(e: MouseEvent) {
    this.currentPoint = new Vector2(e.clientX, e.clientY)
    const state = this.data.getState()
    const rectList = state.rectList
    const res = this.checkRect(rectList)
    // 只能选中一个
    rectList.forEach(e => e.unSelect())

    if (res && res.length === 1) {
      if (res[0].getIsActive()) {
        res[0].select()
      }
      this.data.renderAll()
    }
  }


  // 检测矩形
  checkRect(list: Rect[]) {
    return list.filter((rect: Rect) => {
      if (this.currentPoint.x > rect.points[0].x && this.currentPoint.y > rect.points[0].y && this.currentPoint.x < rect.points[2].x && this.currentPoint.y < rect.points[2].y) {
        return true
      }
      if (this.currentPoint.x > rect.points[2].x && this.currentPoint.y > rect.points[2].y && this.currentPoint.x < rect.points[0].x && this.currentPoint.y < rect.points[0].y) {
        return true
      }
      return false
    })
  }

  checkControlPoints(list: Vector2[]) {
    document.documentElement.style.cursor = ""
    list.forEach((v: Vector2) => {
      // 控制点半径为6
      if(v.distanceTo(this.currentPoint) < 6) {
        document.documentElement.style.cursor = "pointer"
      }
    })
  }

  // 检测线段
  checkPolyline() {

  }

  // 检测多边形
  checkPolygon() {

  }

}