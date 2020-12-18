<template>
  <div class="container">
    <img src="~@/assets/images/routeinfo.jpg" alt="routeInfo" class="size" />
  </div>
</template>

<script>
export default {
  name: "routeInfo",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
@import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
.container {
  height: 90vh;
  width: 100vw;
}
.size {
  height: auto;
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
  bottom: 0;
  -o-object-fit: fill;
  object-fit: fill;
}
</style>


