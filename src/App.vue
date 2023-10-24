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

  const rectList = []

  let startX = 0;
  let startY = 0;
  let isDraw = false

  const mouseDown = (e: MouseEvent) => {
    e.preventDefault()
    console.log(e.clientX, e.clientY)
    startX = e.clientX
    startY = e.clientY
    isDraw = true
  }

  const mouseMove = (e: MouseEvent) => {
    if (!isDraw) return
    const curX = e.clientX
    const curY = e.clientY
    ctx.clearRect(0, 0, can.width, can.height)
    ctx.strokeStyle = "#333333"
    ctx.strokeRect(startX, startY, curX - startX, curY - startY)

  }

  const mouseUp = (e: MouseEvent) => {
    console.log(e)
    isDraw = false
  }

  can.addEventListener("mousedown", mouseDown)
  can.addEventListener("mousemove", mouseMove)
  can.addEventListener("mouseup", mouseUp)







})



</script>
<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>
