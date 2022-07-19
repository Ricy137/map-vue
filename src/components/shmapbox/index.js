import Vue from 'vue'
import Panel from './ShPanel.vue'
import DragPanel from './DragPanel.vue'

/**
 * 全局注册组件
 * @param {string} name 
 * @param {Vue} components 
 */
const register = (name, components)=>{
    app.component(name, components);
}

export default {
    install(Vue){
        Vue.component("ShPanel", Panel )  // 前者必须是字符串格式
        Vue.component("DragPanel", DragPanel )  // 前者必须是字符串格式
    }
}