import { Popup } from "mapbox-gl";
// 最小化引入，减小打包体积
import { featureCollection, point } from "turf-helpers";
import Store from "./Store";
import placedata from "./data";

import Vue from "vue";
import PopupPanel from "../../components/shmapbox/PopupPanel.vue";
const PopupPanelItem = Vue.extend(PopupPanel);
export default {
  mapOp(map) {
    // 加载图像
    //  map.loadImage("/城隍庙.jpg", (error, image) => {
    // if (error) throw error;
    //todo 缺少图片
    // map.addImage("chm", image);
    // Add a GeoJSON source with 2 points
    //  });
    //  map.loadImage("/人民广场.jpg", (error, image) => {
    //  if (error) throw error;
    //todo 缺少图片
    //map.addImage("peopleSquare", image);
    // Add a GeoJSON source with 2 points
    //   });

    const points = [
      point([121.470084, 31.234664], placedata[0]),
      point([121.487217, 31.228267], placedata[1]),
    ];
    const data = featureCollection(points);
    const source = {
      type: "geojson",
      data: data,
    };
    map.addSource("points", source);
    // Add a symbol layer
    map.addLayer({
      id: "places",
      type: "symbol",
      source: "points",
      minzoom: 11,
      layout: {
        // 注释这两行关闭图片
        // 'icon-image': ['get', 'imagename'],
        // 'icon-size': ['get', 'scale'],
        // get the title name from the source's "title" property
        "text-field": ["get", "title"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1.25],
        "text-anchor": "top",
      },
      paint: {
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
      },
    });

    /**
     * @type {Map<string, Popup>}
     */
    const pops = new Map();
    /**
     *
     * @param {string} id
     * @returns {Popup}
     * 可以尝试在生成Popup时生成Poupo的样式
     * 现在Popup中的文本是description中写死的，可以使用Popup中的sethtml或者setDOMContent函数
     */
    const getOrCreatePopup = (id) => {
      if (!pops[id]) {
        pops[id] = new Popup({
          offset: [0, -40],
          className: "mapboxpopupcontainer",
          closeButton: false,
        });
      }
      return pops[id];
    };

    getOrCreatePopup('人民广场')
      .setLngLat([121.4700847864151, 31.234664911083584])
      //添加div元素用于挂载popup
      .setHTML(`<div id='人民广场'></div>`)
      .addTo(map);
    Vue.nextTick(() => {
      new PopupPanelItem({
        propsData: { description: "上海人民广场" },
      }).$mount(`#人民广场`);
    });

    const onEnter = (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      const title = e.features[0].properties.title;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      getOrCreatePopup(title)
        .setLngLat(coordinates)
        //添加div元素用于挂载popup
        .setHTML(`<div id=${title}>555</div>`)
        .addTo(map);
      Vue.nextTick(() => {
        new PopupPanelItem({
          propsData: { description: description },
        }).$mount(`#${title}`);
      });
    };

    const onClick = (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      const title = e.features[0].properties.title;
      //todo link无用定义
      // const link = e.features[0].properties.link;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      getOrCreatePopup(title)
        .setLngLat(coordinates)
        //添加div元素用于挂载popup
        .setHTML(`<div id=${title}>555</div>`)
        .addTo(map);
      Vue.nextTick(() => {
        new PopupPanelItem({
          propsData: { description: description },
        }).$mount(`#${title}`);
      });

      const store = Store.instance;
      {
        store.setPanelVisible(true);
        store.setMessage(description);
        // window.open(link);
      }
    };
    map.on("click", "places", onClick);
    map.on("mouseenter", "places", onEnter);

    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
    });
  },
};
