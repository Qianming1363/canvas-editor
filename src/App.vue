<script setup lang="ts">
import { Editor } from "./core/editor/Editor";
import { onMounted, ref } from "vue"
const canvas = ref<HTMLCanvasElement>()
console.log(canvas)

let editor: Editor;

onMounted(() => {
  const can = canvas.value as HTMLCanvasElement
  can.width = document.body.clientWidth
  can.height = document.body.clientHeight
  editor = new Editor(can)
})

const clear = () => {
  editor.clear()
}

</script>
<template>
  <canvas class="canvas" ref="canvas"></canvas>
  <div class="top-bar">
    <button @click="clear">清除</button>
    <button>撤销</button>
    <button>取消</button>
    <button>线段</button>
    <button>矩形</button>
    <button>多边形</button>
    <button>圆</button>
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
  background-color: #FFF;
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
