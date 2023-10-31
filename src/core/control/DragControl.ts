import { Data } from "../data/Data";

export class DragControl {
  private startX = 0;
  private startY = 0;
  private isDrag = false
  private data: Data;
  private scale = 1;

  constructor(data: Data) {
    this.data = data
    this.initZoom()
  }

  initZoom() {
    document.addEventListener("wheel", (event: WheelEvent) => {
      this.scale += (-event.deltaY / Math.abs(event.deltaY) * (0.02 + 0.1 * this.scale))
      if (this.scale < 0.05) {
        this.scale = 0.05
      } else if (this.scale > 2.5) {
        this.scale = 2.5
      }
      this.data.setScale(this.scale)
    })
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
    let offsetX = (e.clientX - this.startX)
    let offsetY = (e.clientY - this.startY)
    this.data.setOffset(offsetX, offsetY)
  }

  mouseUp(e: MouseEvent) {
    if (!this.isDrag) return
    this.startX = 0
    this.startY = 0
    this.isDrag = false
  }

}