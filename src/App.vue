<script setup lang="ts">
import { onMounted, ref } from "vue"
const canvas = ref<HTMLCanvasElement>()
console.log(canvas)
let rectList: Array<number[]> = []
let ctx: any
const renderAll = () => {
  rectList.forEach(p => {
    ctx.strokeRect(p[0], p[1], p[2] - p[0], p[3] - p[1])
  })
}

onMounted(() => {

  const can = canvas.value as HTMLCanvasElement
  // 初始化2D sdk
  can.width = document.body.clientWidth
  can.height = document.body.clientHeight

  ctx = can.getContext('2d');
  if (!ctx) {
    console.log("无法获取canvas上下文")
    return
  }


  const data = localStorage.getItem("rectList")
  if (data) {
    rectList = JSON.parse(data)
    renderAll()
  } else {
    console.log("未发现保存数据")
  }

  let startX = 0;
  let startY = 0;
  let isDraw = false
  let endX = 0;
  let endY = 0;

  let img = new Image();

  const mouseDown = (e: MouseEvent) => {
    e.preventDefault()
    startX = e.clientX
    startY = e.clientY
    isDraw = true
    img.src = can.toDataURL()
  }

  const mouseMove = (e: MouseEvent) => {
    if (!isDraw) return
    ctx.clearRect(0, 0, can.width, can.height)
    ctx.drawImage(img, 0, 0, can.width, can.height);
    endX = e.clientX
    endY = e.clientY
    ctx.strokeStyle = "#333333"
    ctx.strokeRect(startX, startY, endX - startX, endY - startY)
  }

  const mouseUp = (e: MouseEvent) => {
    console.log(e)
    isDraw = false
    // 保存rect数据
    rectList.push([startX, startY, endX, endY])
    console.log(rectList)
    ctx.clearRect(0, 0, can.width, can.height)
    // 绘制所有矩形
    renderAll()

    localStorage.setItem("rectList", JSON.stringify(rectList))

  }

  can.addEventListener("mousedown", mouseDown)
  can.addEventListener("mousemove", mouseMove)
  can.addEventListener("mouseup", mouseUp)

})


const clear = () => {
  rectList = []
  ctx.clearRect(0, 0, 3000, 3000)
}


</script>
<template>
  <canvas class="canvas" ref="canvas"></canvas>
  <div class="top-bar">
    <button @click="clear">清除</button>
    <button>保存</button>
    <button>矩形</button>
    <button></button>
  </div>
</template>

<style scoped>
.canvas {
  position: fixed;
  left: 0;
  top: 0;
}

.top-bar {
  position: fixed;
  top: 18px;
  width: 1000px;
  height: 64px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  border-radius: 12px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
}

button {
  height: 40px;
  width: 40px;
  margin-left: 30px;
  background-color: #CCC;
  border-radius: 8px;
  cursor: pointer;
}
</style>
