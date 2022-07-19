const state = {
    isShowLeftContent: false
}
const getters = {
    isShowLeftContent: state => state.isShowLeftContent
}
const mutations = {
    setLeftContentVisible(state, data) {
        state.isShowLeftContent = data
    }
}

const actions = {}

export default {
    getters,
    state,
    mutations,
    actions
}