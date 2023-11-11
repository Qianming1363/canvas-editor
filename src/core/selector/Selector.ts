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
    this.currentPoint = new Vector2(e.clientX, e.clientY)//.computeScale(params.half, params.offset, params.scale)
    const state = this.data.getState()
    const rectList = state.rectList
    const res = this.checkRect(rectList)
    if (res) {
      rectList.forEach(e => e.deactive())
      res.forEach(e => e.active())
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

  // 检测线段
  checkPolyline() {

  }

  // 检测多边形
  checkPolygon() {

  }

}