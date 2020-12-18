import $ from 'jquery'
//import 'jquery/src/jquery'

//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min'
import VueRouter from 'vue-router'
import echarts from 'echarts'
import router from "./router"
import Vue from "vue"
import Vuex from 'vuex'
import app from './App.vue'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    curFromChartInfo: {
      PC11: [],
      PC33: [],
      PC55: [],
      route1: [],
      route2: [],
      route3: [],
      route4: [],
      route5: [],
    },
    curToChartInfo: {
      PC11: [],
      PC33: [],
      PC55: [],
      route1: [],
      route2: [],
      route3: [],
      route4: [],
      route5: [],
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setFromChartInfo(state, chartInfo) {
      state.curFromChartInfo = chartInfo;
    },
    setToChartInfo(state, chartInfo) {
      state.curToChartInfo = chartInfo;
    }
  }
})
new Vue({
  render: h => h(app),
  router,
  store: store
}).$mount('#app')

