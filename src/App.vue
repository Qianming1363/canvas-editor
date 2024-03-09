<script setup lang="ts">
import { Editor } from "./core/editor/Editor";
import { onMounted, ref } from "vue"
import { Mode } from "./core/editor/Mode";
import { State } from "./core/data/DataManager";
const canvas = ref<HTMLCanvasElement>()

var editor: Editor;

onMounted(async () => {
  const can = canvas.value as HTMLCanvasElement
  can.width = document.body.clientWidth
  can.height = document.body.clientHeight
  editor = new Editor(can)
  const res = await getData()
  editor.setData(res as State)
  // window.editor = editor
})

const getData = () => {
  return new Promise((resolve, reject) => {
    fetch("/data.json").then((res) => {
      res.json().then(val => {
        resolve(val)
      }).catch(reject)
    })
  })

}

const clear = () => {
  editor.clear()
}

const switchMode = (mode: Mode) => {
  editor.setDrawMode(mode)
}

</script>
<template>
  <canvas class="canvas" ref="canvas"></canvas>
  <div class="top-bar">
    <button @click="clear">清除</button>
    <button @click="editor.back">撤销</button>
    <button @click="editor.cancelBack">还原</button>
    <button @click="switchMode(Mode.POLYLINE)">线段</button>
    <button @click="switchMode(Mode.RECT)">矩形</button>
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
  width: 90vw;
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
