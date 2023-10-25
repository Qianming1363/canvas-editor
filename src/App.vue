<script setup lang="ts">
import { onMounted, ref } from "vue"
const canvas = ref<HTMLCanvasElement>()
console.log(canvas)

onMounted(() => {

  const can = canvas.value as HTMLCanvasElement
  // 初始化2D sdk
  can.width = document.body.clientWidth
  can.height = document.body.clientHeight

  const ctx = can.getContext('2d');
  if (!ctx) {
    console.log("无法获取canvas上下文")
    return
  }

  // const rectList = []

  let startX = 0;
  let startY = 0;
  let isDraw = false
  let endX = 0;
  let endY = 0;

  let img = new Image();

  const mouseDown = (e: MouseEvent) => {
    e.preventDefault()
    console.log(e.clientX, e.clientY)
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
    // 删除背景
  }

  can.addEventListener("mousedown", mouseDown)
  can.addEventListener("mousemove", mouseMove)
  can.addEventListener("mouseup", mouseUp)

})



</script>
<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<style scoped>
.canvas {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
