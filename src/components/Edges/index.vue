<template>
  <div />
</template>

<script>
import edges from "./edges";

export default {
  name:'edges',
  data() {
      return{}
  },
  created() {
    console.log("edge组件初始化.....");
    this.init();
  },
  methods: {
    init() {
     edges.init();
    }
  }
};
</script>


