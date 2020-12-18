import Vue from "vue"

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import routeInfo from './components/routeInfo/routeInfo.vue'
import traffic_chart from './components/traffic_chart/traffic_chart.vue'
import page from './components/Page/index.vue'
// 路由入口
var router=new VueRouter({
   routes:[
      {path:'/',redirect:'/home'},
      {path:'/home',component:page},
      {path:'/routeInfo',component:routeInfo},
      {path:'/traffic_chart',component:traffic_chart},
   ],
   linkActiveClass:'active'
})

export default router