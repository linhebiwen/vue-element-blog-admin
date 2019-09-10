import Vue from 'vue'
import Vuex from 'vuex'
import { leftMenu } from '@/router'

Vue.use(Vuex)

const state = {
  menu: leftMenu,
  isCollapse: false,
  minMenuWidth: '64px',
  maxMenuWidth: '180px',
  sidebar: {
    width: '180px',
    opened: true
  }
}

const getters = {
  getLeftMenu: state => state.menu,
  getCollapse: state => state.isCollapse,
  getSidebar: state => state.sidebar
}

const actions = {
  SET_COLLAPSE: ({ commit }) => {
    commit('SET_COLLAPSE')
  }
}

const mutations = {
  SET_COLLAPSE: state => {
    state.isCollapse = !state.isCollapse
    if (state.sidebar.opened) {
      state.sidebar.width = state.minMenuWidth
    } else {
      state.sidebar.width = state.maxMenuWidth
    }
    state.sidebar.opened = !state.sidebar.opened
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})