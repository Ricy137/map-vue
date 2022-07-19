
const state = {
  language: "zh",
  keywords: "",
  isCollapse: false,
  isMobile: false,
  theme: 'light'
};
const getters = {
  language: (state) => state.language,
  keywords: (state) => state.keywords,
  isCollapse: (state) => state.isCollapse,
  isMobile: (state) => state.isMobile,
  theme: (state) => state.theme,
};
const mutations = {
  setLanguage(state, data) {
    state.language = data;
  },
  setKeywords(state, data) {
    state.keywords = data;
  },
  setIsCollapse(state) {
    state.isCollapse = !state.isCollapse;
  },
  setIsMobile(state, data) {
    state.isMobile = data;
  },
  setTheme(state, data) {
    state.theme = data;
  }
};

const actions = {};

export default {
  // namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
