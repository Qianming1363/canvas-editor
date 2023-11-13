import { Vector2 } from "../math/Vector2";

export enum ControlPointType {
  FREE = "FREE",                // 可以自由拖动
  HORIZONTAL = "HORIZONTAL",    // 水平方向移动
  VERTICAL = "VERTICAL",        // 熟知方向移动
  ROTATION = "ROTATION"         // 旋转控制点 
}

export class ControlPoint {

  private p: Vector2 = new Vector2()
  private controlType = ControlPointType.FREE

  constructor(x: number, y: number, t: ControlPointType) {
    this.p = new Vector2(x, y)
    this.controlType = t
  }


  // 传入鼠标坐标，按类型规则更新当前点
  moveTo(v: Vector2) {
    switch (this.controlType) {
      case ControlPointType.FREE:
        this.p = v.clone();
        break;
      case ControlPointType.HORIZONTAL:
        this.p.x = v.x;
        break;
      case ControlPointType.VERTICAL:
        this.p.y = v.y;
        break;
      case ControlPointType.ROTATION:
        this.p = v.clone()
        break;
    }
  }


}