import Vue from 'vue'
import Vuex from 'vuex'
import shanghaimodule from './modules'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: shanghaimodule
})

export default store