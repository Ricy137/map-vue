<!--
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-01-30 15:10:38
 * @LastEditTime: 2022-02-01 18:59:30
 * @FilePath: \src\components\shmapbox\ShPanel.vue
-->
<template>
  <div>
    <div id="popup">
      <div id="popup-exit">x</div>
      <div id="popup-titel">标题</div>
      <img id="popup-img" src="../../public/test.png" />
      <div id="popup-text">
        描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字
      </div>
      <div id="popup-button">按钮</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#popup {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 45%;
  background: #96d7ffb8;
  border-radius: 40px;
}

#popup-exit {
  float: right;
  font-size: 35px;
  margin-right: 20px;
  cursor: pointer;
}

#popup-titel {
  font-size: 40px;
  padding-left: 40px;
  padding-top: 20px;
  margin-bottom: 20px;
}

#popup-img {
  position: absolute;
  right: 50px;
  top: 50px;
  height: 50%;
  padding-left: 40px;
  margin-bottom: 20px;
}

#popup-text {
  padding-left: 40px;
  padding-right: 55%;
  padding-bottom: 20px;
  line-height: 24px;
}

#popup-button {
  position: absolute;
  bottom: 30px;
  width: 20%;
  background: #75a4ff;
  height: 32px;
  left: 40%;
  text-align: center;
  padding-top: 5px;
  font-size: 20px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

#popup-button:hover {
  background: #4281ff;
}
</style>
