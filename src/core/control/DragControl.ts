import { DataManager } from "../data/DataManager";

export class DragControl {
  private startX = 0;
  private startY = 0;
  private isDrag = false
  private data: DataManager;
  private scale = 1;

  constructor(data: DataManager) {
    this.data = data
    this.initZoom()
  }

  initZoom() {
    document.addEventListener("wheel", (event: WheelEvent) => {
      this.scale += (-event.deltaY / Math.abs(event.deltaY) * (0.001 + 0.05 * this.scale))
      if (this.scale < 0.001) {
        this.scale = 0.001
      } else if (this.scale > 2.5) {
        this.scale = 2.5
      }
      this.data.setScale(this.scale)
    })
  }

  mouseDown(e: MouseEvent) {
    if (e.button !== 2) return
    this.isDrag = true
    const { x, y } = this.data.getOffset()
    const scale = this.data.getScale()
    this.startX = (e.clientX - x * scale)
    this.startY = (e.clientY - y * scale)
  }


  mouseMove(e: MouseEvent) {
    if (!this.isDrag) return
    const scale = this.data.getScale()
    let offsetX = (e.clientX - this.startX) / scale
    let offsetY = (e.clientY - this.startY) / scale
    this.data.setOffset(offsetX, offsetY)
  }

  mouseUp(e: MouseEvent) {
    if (!this.isDrag) return
    this.startX = 0
    this.startY = 0
    this.isDrag = false
  }

}