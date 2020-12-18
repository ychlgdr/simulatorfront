<template>
  <div>
    <nav class="navbar navbar-inverse navbar-static-top navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/home">Main</router-link>
        </div>
        <div>
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/traffic_chart">Traffic-Chart</router-link>
            </li>
            <li><router-link to="/routeInfo">routeInfo</router-link></li>
            <li><a href="http://www.cnic.cas.cn/" target="view_window">AboutUs</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- middle-part -->
    <router-view></router-view>
  </div>
</template>

<script>
import page from "./components/Page";
import routeInfo from './components/routeInfo/routeInfo.vue'
import traffic_chart from './components/traffic_chart/traffic_chart.vue'
export default {
  name: "app",
  components: { page,routeInfo,traffic_chart },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 0px;
}

html,
body {
  overflow: hidden;
  margin: 0;
  font-size: 12px;
}
#app {
  margin: 0;
  padding: 0;
}
</style>
