<template>
  <div class="home-wrap">
    <div class="home-container flex-row">
      <!-- <DragPanel -->
      <!-- v-show="panelVisible" -->
      <!-- @exit="onexit" -->
      <!-- :title="'标题名称'" -->
      <!-- :width="350" -->
      <!-- :height="600" -->
      <!-- > -->
      <!-- <img -->
      <!-- class="panel-img" -->
      <!-- style="margin-bottom: 20px" -->
      <!-- alt="图片" -->
      <!-- width="100%" -->
      <!-- src="/test.png" -->
      <!-- /> -->
      <!-- 文字信息 -->
      <!-- <div class="panel-text" v-html="message"></div> -->
      <!-- <el-button class="center" type="primary">进入</el-button> -->
      <!-- </DragPanel> -->
      <place-detail class="left-content"></place-detail>
      <div class="map-container"><div id="map"></div></div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import PlaceDetail from "../../components/shmapbox/PlaceDetail.vue";

import Store from "../../utils/shmapbox/Store";
import mo from "../../utils/shmapbox/mapOperation";
import Map3dModel from "../../utils/shmapbox/mapOperationModel";
import placedata from "../../utils/shmapbox/data";

export default {
  components: {
    PlaceDetail,
  },
  data() {
    return {
      // 面板显示
      panelVisible: false,
      message:
        "文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述",
    };
  },
  mounted() {
    this.initMap();
    Store.prototype.setMessage = this.setMessage;
    Store.prototype.setPanelVisible = this.setPanelVisible;
  },
  methods: {
    initMap() {
      const store = Store.instance;

      mapboxgl.accessToken =
        "pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg";

      // 地图边界
      const bounds = [
        [115, 26],
        [125, 36],
      ];

      const map = new mapboxgl.Map({
        container: "map",

        center: [121.49765355351474, 31.227215021449297],
        zoom: 7,
        // 本地开发 /public 路径就是根路径，会自动复制
        style: "./osm_liberty_light.json",
        // style: "./osm_liberty_dark_light_green.json",
        // 去掉logo
        attributionControl: false,
        maxBounds: bounds,
      });

      map.on("load", () => {
        // 面板显示
        // this.panelVisible = true;

        map.flyTo({
          zoom: 14.44,
          pitch: 65,
          center: [121.4700847864151, 31.234664911083584],
          bearing: 176.80358960765,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          speed: 0.8, // make the flying slow
          curve: 1, // change the speed at which it zooms out
          duration: 3000, // ms
        });

        // map.addLayer({
        //   id: "sky",
        //   type: "sky",
        //   paint: {
        //     "sky-type": "atmosphere",
        //     "sky-atmosphere-sun": [0.0, 0.0],
        //     "sky-atmosphere-sun-intensity": 15,
        //   },
        // });

        // 右下角添加控件，可能不需要
        // let nav = new NavigationControl({showCompass:true});
        // map.addControl(nav, "bottom-right")

        // map.on("click", function (e) {
        //   // 以此点*px范围内的正方形算为点击反应区
        //   var bbox = [
        //     [e.point.x - 1, e.point.y - 1],
        //     [e.point.x + 1, e.point.y + 1],
        //   ];
        //   // mapbox 返回查询要素的图层属性
        //   var features = map.queryRenderedFeatures(bbox);
        //   console.log(features);
        // });
        // 加载地图文字（城隍庙）
        mo.mapOp(map);
        // 加载模型
        new Map3dModel(map, {
          id: "城隍庙",
          gltfURL: "guanyin.gltf",
          modelOrigin: [121.48812186123087, 31.229434648133],
          modelAltitude: 0,
          modelRotate: [Math.PI, Math.PI, 0],
          // onload(obj) {
          //   console.log(obj);
          // },
          onclick() {
            const ret = placedata.find((it) => it.title == "城隍庙");
            // console.log(ret);
            if (ret) {
              store.setPanelVisible(true);
              store.setMessage(ret.description);
            }
          },
        });
        new Map3dModel(map, {
          id: "人民广场",
          gltfURL: "xiangqinjiao.vox-0.gltf",
          modelOrigin: [121.470084, 31.234664],
          modelAltitude: 0,
          modelRotate: [Math.PI / 2, 0, 0],
          modelScale: [1, 2, 1], // 第二个值是 "z" 方向
          // onload(obj) {
          //   console.log(obj);
          // },
          onclick() {
            const ret = placedata.find((it) => it.title == "人民广场");
            // console.log(ret);
            store.setPanelVisible(true);
            store.setMessage(ret.description);
          },
        });
      });

      store.map = map;
    },

    setMessage(str) {
      this.message = str;
    },

    setPanelVisible(panelVisible) {
      this.panelVisible = panelVisible;
    },

    onexit() {
      this.panelVisible = false;
    },
  },
};
</script>

<style lang="scss">
.home-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.home-container {
  height: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  .map-container {
    flex: 3;
    position: relative;
    overflow: hidden;
  }
  .left-content {
    position: absolute;
    height: 100%;
    overflow: auto;
  }
}
.mapboxgl-popup-content {
  font-size: 2rem;
  letter-spacing: 0.2rem;
  line-height: 2.5rem;
  border-radius: 1rem;
}
.mapbox-logo,
.mapboxgl-ctrl-logo {
  display: none !important;
}
.panel-text {
  font-size: 16px;
  font-family: "仿宋", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.panel-text > a {
  color: rgb(154, 222, 240);
}

.panel-text > a:visited {
  color: rgb(154, 222, 240);
}

.panel-text > a:active {
  color: rgb(154, 222, 240);
}

.panel-button {
  position: absolute;
  bottom: 30px;
  width: 130px;
  background: rgba(89, 153, 220, 0.76);
  height: 32px;
  left: 110px;
  text-align: center;
  padding-top: 5px;
  font-size: 20px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}
.panel-button:hover {
  background: rgba(120, 183, 245, 0.85);
}
.panel-img {
  user-select: none;
}
.center {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 10%);
}
</style>
