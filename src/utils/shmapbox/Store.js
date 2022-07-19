/*
 * @Author: ricy
 * @LastEditors: ricy
 * @Date: 2022-01-30 13:44:20
 * @LastEditTime: 2022-01-30 14:05:31
 * @FilePath: \src\utils\shmapbox\Store.js
 */
// import mapboxgl from "mapbox-gl";

class Store {
  map_ = null;

  get instance() {
    return window["store"];
  }

  get map() {
    return this.map_;
  }

  set map(m) {
    this.map_ = m;
  }
}

const store = new Store();
window["store"] = store;
Store.instance = store;
export default Store;
