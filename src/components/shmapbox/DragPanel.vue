<template>
  <div
    class="panel"
    ref="panel"
    :style="{
      top: top,
      left: right ? undefined : left + 'px',
      right: right + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <div class="bar" ref="bar">
      <!-- 退出时使用事件 -->
      <div @click="clickExit" class="bar-exit">
        <img width="20" height="20" style="stroke: red" src="/exit.svg" />
      </div>
      <span>{{ title }}</span>
    </div>
    <el-divider class="divider1"></el-divider>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      down: false,
      left_: 0,
      dx: 0,
      dy: 0,
      top_: 0,
    };
  },
  props: {
    width: { type: Number, default: () => 300 },
    height: { type: Number || String, default: () => 400 },
    left: { type: Number, default: () => 10 },
    right: { type: Number },
    top: { type: Number || String },
    title: { type: String, default: () => "标题" },
    vis: { type: Boolean, default: () => true },
  },
  mounted() {
    window.addEventListener("mouseup", this.mouseup);
    const bar = this.$refs["bar"];
    bar.addEventListener("mousedown", this.mousedown);
    window.addEventListener("mousemove", this.mousemove);
  },

  destroyed() {
    window.removeEventListener("mouseup", this.mouseup);
    window.removeEventListener("mousemove", this.mousemove);
  },
  methods: {
    mouseup() {
      const panel = this.$refs["panel"];
      panel.style.left = this.left_ + "px";
      panel.style.top = this.top_ + "px";
      this.down = false;
      panel.style.cursor = "";
    },
    mousedown(e) {
      const panel = this.$refs["panel"];
      this.dx = e.clientX - panel.offsetLeft;
      this.dy = e.clientY - panel.offsetTop;
      this.down = true;
    },
    mousemove(e) {
      if (this.down) {
        this.left_ = e.clientX - this.dx;
        this.top_ = e.clientY - this.dy;
        const panel = this.$refs["panel"];
        panel.style.left = this.left_ + "px";
        panel.style.top = this.top_ + "px";
        panel.style.cursor = "move";
      }
    },
    clickExit() {
      this.$emit("exit");
    },
  },
});
</script>

<style>
.divider1 {
  display: inline-block;
  left: calc(5%);
  width: 90%;
  height: 2px;
  margin: -5px 0 0 0;
  background-color: rgba(135, 171, 248, 0.74);
  vertical-align: top;
}
.panel {
  color: white;
  position: fixed;
  margin: 5px 5px 5px 5px;
  width: 300px;
  background: rgba(7, 44, 75, 0.3);
  border-radius: 1px;
  box-shadow: 0 0 3px #ffffff;
  /* border: 1px solid #1a879a; */
  width: 350px;
  height: 600px;
  top: 30px;
  left: 30px;
}

/* 标题 */
.bar {
  color: rgb(220, 226, 248);
  font-size: 22px;
  user-select: none;
  margin: 10px 10px 10px 20px;
  width: 100%;
}

.bar-exit {
  position: absolute;
  right: 24px;
  top: 10px;
  color: black;
  cursor: pointer;
}

.container {
  margin: 10px 20px 10px 20px;
  white-space: pre-wrap;
}
</style>
