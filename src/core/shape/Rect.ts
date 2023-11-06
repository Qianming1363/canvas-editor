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

  render() {

  }


}