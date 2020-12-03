<template>
<div>
    <!-- 组件入口 -->
     <!-- header part -->
    <page></page>
</div>
   
</template>

<script>

import page from "./components/Page"
export default {
  name: 'app',
  components:{page},

};
</script>

<style scoped>
.nav a{
    font-style: normal;
    font-size:1.2em;
}
.navbar{
    margin-bottom: 0px;
}

html, body {
    overflow: hidden;
    margin: 0;
    font-size: 12px;
}
#app{
  margin: 0;
  padding: 0;
}
</style>