import { Data } from "../data/Data";

export class DragControl {

  private startX = 0;
  private startY = 0;
  private isDrag = false

  private data: Data;

  constructor(data: Data) {
    this.data = data
  }

  mouseDown(e: MouseEvent) {
    if (e.buttons !== 2) return
    this.isDrag = true
    const { x, y } = this.data.getOffset()
    this.startX = e.clientX - x
    this.startY = e.clientY - y
  }


  mouseMove(e: MouseEvent) {
    if (!this.isDrag) return
    let offsetX = e.clientX - this.startX
    let offsetY = e.clientY - this.startY
    this.data.setOffset(offsetX, offsetY)
  }

  mouseUp(e: MouseEvent) {
    if (!this.isDrag) return
    this.startX = 0
    this.startY = 0
    this.isDrag = false
  }

}