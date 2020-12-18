<template>
  <div />
</template>

<script>
import nodes from "./nodes";

export default {
  name:'nodes',
  data() {
      return{}
  },
  created() {
    console.log("node组件初始化.....");
    this.init();
  },
  methods: {
    init() {
     nodes.init();
    }
  }
};
</script>


