//import $ from 'jquery'
import 'jquery/src/jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'


import Vue from "vue"

import app from './App.vue'


new Vue({
  render: h => h(app)
}).$mount('#app')

