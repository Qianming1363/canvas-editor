
export class ZoomControl {

  constructor() {
    let scaleFactor = 1
    this.canvas.addEventListener('wheel', (event) => {
      var mouseX = event.clientX - this.canvas.offsetLeft; // 获取鼠标相对于Canvas左上角的X坐标
      var mouseY = event.clientY - this.canvas.offsetTop; // 获取鼠标相对于Canvas左上角的Y坐标

      // 计算缩放后的Canvas中心点在原坐标系下的坐标
      var canvasCenterX = this.canvas.width / 2;
      var canvasCenterY = this.canvas.height / 2;

      // 将坐标系原点平移到Canvas的中心点
      this.ctx?.translate(canvasCenterX, canvasCenterY);

      // 检查滚轮的方向
      if (event.deltaY < 0) {
        // 向上滚动，放大内容
        scaleFactor += 0.1;
      } else {
        // 向下滚动，缩小内容，但保证不会小于1
        scaleFactor = Math.max(0.5, scaleFactor - 0.1);
      }

      // 缩放并绘制内容
      this.ctx?.scale(scaleFactor, scaleFactor);

      // 将坐标系原点平移回来
      this.ctx?.translate(-canvasCenterX, -canvasCenterY);

      // this.ctx?.fillRect(10, 10, 50, 50); // 这个矩形会根据缩放比例放大或缩小
      this.data?.renderAll()

      // 阻止默认滚轮事件，防止页面滚动
      event.preventDefault();
    });
  }
}