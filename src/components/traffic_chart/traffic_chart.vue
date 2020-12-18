<template>
  <div class="container">
    <div id="PC11">11</div>
    <div id="PC33">22</div>
    <div id="PC55">33</div>
    <div id="route1">44</div>
    <div id="route2">55</div>
    <div id="route3">66</div>
    <div id="route4">77</div>
    <div id="route5">88</div>
  </div>
</template>

<script>
export default {
  name: "traffic_chart",
  data() {
    return {
      names: [
        "PC11",
        "PC33",
        "PC55",
        "route1",
        "route2",
        "route3",
        "route4",
        "route5",
      ],
    };
  },
  mounted() {
    this.names.forEach((name) => {
      this.drawLine(name);
    });
  },
  methods: {
    drawLine(curChartName) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(curChartName));
      var option = {
        title: {
          text: "Traffic_Chart(" + curChartName + ")",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "发送包流量",
            type: "line",
            useUTC: true,
            showSymbol: false,
            hoverAnimation: false,
            data: this.curFromChartInfo[curChartName],
          },
          {
            name: "接受包流量",
            type: "line",
            useUTC: true,
            showSymbol: false,
            hoverAnimation: false,
            data: this.curToChartInfo[curChartName],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  computed: {
    curFromChartInfo() {
      return this.$store.state.curFromChartInfo;
    },
    curToChartInfo() {
      return this.$store.state.curToChartInfo;
    },
  },
};
</script>

<style scoped>
.container {
  height: 90vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
</style>

