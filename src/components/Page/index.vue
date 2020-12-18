<template>
  <div :class="{ noneclick: !bgpfinished }">
    <div class="box">
      <div class="left">
        <div class="btn-group" v-show="showBtn">
          <button @click="createtopo" class="btn btn-default">create</button>
          <button @click="starttopo" class="btn btn-default">start</button>
          <button class="btn btn-default">attack</button>
          <button class="btn btn-default">stop</button>
          <button class="btn btn-default">+</button>
          <button class="btn btn-default">-</button>
        </div>
        <div>
          <button @click="createtopo" class="btn btn-default">create</button>
        </div>
        <div id="mountNode">
          <edges />
          <nodes />
        </div>
        <div>
          <div v-show="showroute">
            <div class="route">
              <h4>BGP Info({{ curRouteName }})</h4>
              <div style="height: 130px; width: 90%; overflow: auto">
                <div class="table-responsive">
                  <table class="table table-condensed">
                    <tr>
                      <th v-for="(item, ind) in routeList" :key="ind">
                        {{ item }}
                      </th>
                    </tr>
                    <tr
                      v-for="(item, index) in curRouteInfo"
                      :key="index"
                      :class="{ newRoute: item.last, oldRoute: !item.last }"
                    >
                      <td v-for="(it, ind) in routeList" :key="ind">
                        {{ item[it] }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showcommand" class="command">
            <div>
              <h4>Console({{ curCommandName }})</h4>
              <div
                class="well well-lg"
                style="height: 100px; width: 90%; overflow: auto"
              >
                <p
                  v-for="(item, index) in curCommandInfo[curCommandName]"
                  :key="index"
                >
                  {{ item }}
                </p>
              </div>
              <input class="txinput" v-model="curCommand" />
              <button class="txbtn btn btn-default" @click="executeCommand">
                执行
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <h1>TRAFFIC INFO</h1>
        <div>
          <table class="table table-striped">
            <tr>
              <th v-for="(item, ind) in columnList" :key="ind">
                {{ item }}
              </th>
            </tr>
            <tr v-for="(item, index) in curTrafficInfo" :key="index">
              <td v-for="(it, ind) in columnList" :key="ind">
                {{ item[it] }}
              </td>
            </tr>
          </table>
          <nav aria-label="...">
            <ul class="pager">
              <li><a @click="prevPage()">Previous</a></li>
              <li>
                <span
                  >第{{ currentTrafficPage }}页/共{{ totalTrafficPage }}页</span
                >
              </li>
              <li><a @click="nextPage()">Next</a></li>
            </ul>
          </nav>
        </div>
        <div id="chart" style="width: 100%; height: 30vh"></div>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
import edges from "../Edges";
import nodes from "../Nodes";
import G6 from "@antv/g6";
import data from "./data";
import data1 from "./data1";
import data2 from "./data2";
import axios from "axios";
import info from "./info";
import insertCss from "insert-css";
import uid from "./uid";
import "jquery/src/jquery";
import { compare } from "@antv/g6/lib/util/math";

export default {
  name: "page",
  components: {
    edges,
    nodes,
  },
  watch: {
    curCommandName: function (name) {
      this.curCommand = this.defaultCommandMap[name];
    },
  },
  data() {
    return {
      graphData: { nodes: [], edges: [] },
      host: [],
      route: [],
      link: [],
      readNodesFinish: false,
      readEdgesFinish: false,
      graph: null,
      socket: null,
      switchinfo: null,
      showBtn: false,
      showroute: false,
      showcommand: false,
      bgpfinished: true,
      columnList: [
        "sourceIP",
        "sourcePort",
        "destinationIP",
        "destinationPort",
        "protocol",
      ], //字段
      routeList: ["best_path", "Network", "Next Hop", "Path"],
      trafficInfo: [],
      curTrafficInfo: [],
      totalTrafficPage: 1,
      currentTrafficPage: 1,
      trafficPageSize: 10,
      curRouteName: null,
      curRouteId: null,
      curRouteInfo: [],
      curCommandId: null,
      curCommandName: null,
      curCommandInfo: {
        /*PC11: null,
        PC33: null,
        PC55: null,
        route1: null,
        route2: null,
        route3: null,
        route4: null,
        route5: null,*/
      },
      curCommand: "",
      curFromChartInfo: {
        //源自该节点的信息
        /*PC11: [],
        PC33: [],
        PC55: [],
        route1: [],
        route2: [],
        route3: [],
        route4: [],
        route5: [],*/
      },
      curToChartInfo: {
        //到该节点的信息
        /* PC11: [],
        PC33: [],
        PC55: [],
        route1: [],
        route2: [],
        route3: [],
        route4: [],
        route5: [],*/
      },
      curChartName: "",
      defaultCommandMap: {
        PC11: "sh server.sh origin",
        PC33: "sh server.sh attacker",
        PC55: "sh client.sh 11.0.0.11",
        route01: "vtysh -f sharefile/router01_bgpd.conf",
        route02: "",
        route03: "vtysh -f sharefile/router03_bgpd.conf",
        route04: "",
        route05: "",
      },
      myChart: null,
    };
  },
  destroyed() {
    console.log("page destroyed");
  },
  mounted() {
    console.log("page组件初始化.....");
    this.init();
  },
  beforeDestroy() {
    this.$store.commit("setToChartInfo", this.curToChartInfo);
    this.$store.commit("setFromChartInfo", this.curFromChartInfo);
  },
  methods: {
    addNode(id, type, name) {
      //向图中添加节点
      const model = {
        id: id,
        size: 30,
        label: name,
        type: type,
      };
      this.graph.addItem("node", model);
    },
    addEdge(
      edgeId,
      sourceId,
      sourceName,
      sourceIp,
      targetId,
      targetName,
      targetIp
    ) {
      //向图中添加边
      const model = {
        id: edgeId,
        source: sourceId,
        sourceName: sourceName,
        target: targetId,
        targetName: targetName,
        label: [sourceIp, targetIp],
        type: "circle-running",
      };
      this.graph.addItem("edge", model);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      var option = {
        title: {
          text: "Traffic_Chart(" + this.curChartName + ")",
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
            data: this.curFromChartInfo[this.curChartName],
          },
          {
            name: "接受包流量",
            type: "line",
            useUTC: true,
            showSymbol: false,
            hoverAnimation: false,
            data: this.curToChartInfo[this.curChartName],
          },
        ],
      };
      this.myChart.setOption(option);
    },
    setCurrentPageData() {
      let begin = (this.currentTrafficPage - 1) * this.trafficPageSize;
      let end = this.currentTrafficPage * this.trafficPageSize;
      this.curTrafficInfo = this.trafficInfo.slice(begin, end);
    },
    //上一页
    prevPage() {
      if (this.currentTrafficPage == 1) return;

      this.currentTrafficPage--;
      this.setCurrentPageData();
    },
    // 下一页
    nextPage() {
      if (this.currentTrafficPage == this.totalTrafficPage) return;
      this.currentTrafficPage++;
      this.setCurrentPageData();
    },

    trafficInfoHandler(res) {
      var data = JSON.parse(res.data);
      this.addTrafficInfo(data);
      this.addChartInfo(data);
      this.addAnimate(data);
    },

    addTrafficInfo(data) {
      this.trafficInfo.unshift(data);
      this.totalTrafficPage =
        parseInt(this.trafficInfo.length / this.trafficPageSize) + 1;
      this.setCurrentPageData();
      //this.addAnimate(JSON.parse(res.data));
    },
    addChartInfo(data) {
      var time = data["time"];
      console.log(typeof (time * 1000));
      var pkts = data["pkts"];
      var sourceUUID = data["sourceUUID"];
      var targetUUID = data["destinationUUID"];
      var cur = {
        value: [parseInt(time * 1000), pkts],
      };
      var sourceNode = this.graph.findById(sourceUUID);
      var targetNode = this.graph.findById(targetUUID);
      var sourceName = this.getNodeName(sourceNode);
      var targetName = this.getNodeName(targetNode);
      var len1 = this.curFromChartInfo[sourceName].length;
      var len2 = this.curToChartInfo[targetName].length;
      if (
        len1 != 0 &&
        this.curFromChartInfo[sourceName][len1 - 1]["value"][0] ==
          cur["value"][0]
      ) {
        this.curFromChartInfo[sourceName][len1 - 1]["value"][1] +=
          cur["value"][1];
      } else {
        this.curFromChartInfo[sourceName].push(cur);
      }

      if (
        len2 != 0 &&
        this.curToChartInfo[targetName][len2 - 1]["value"][0] == cur["value"][0]
      ) {
        this.curToChartInfo[targetName][len2 - 1]["value"][1] +=
          cur["value"][1];
      } else {
        this.curFromChartInfo[sourceName].push(cur);
      }
      this.curToChartInfo[targetName].push(cur);
      //console.log(this.curFromChartInfo[this.curChartName]);
      this.myChart.setOption({
        series: [
          {
            data: this.curFromChartInfo[this.curChartName],
          },
          {
            data: this.curToChartInfo[this.curChartName],
          },
        ],
      });
    },
    addAnimate(data) {
      var dir = -1;
      var isBGP = false;
      var sourcePort = data["sourcePort"];
      var targetPort = data["destinationPort"];
      var protocol = data["protocol"];
      var sourceUUID = data["sourceUUID"];
      var targetUUID = data["destinationUUID"];
      if (sourcePort == "179" || targetPort == "179") {
        isBGP = true;
      }
      var edge = this.graph.find("edge", (edge) => {
        return (
          edge._cfg.source._cfg.id == sourceUUID &&
          edge._cfg.target._cfg.id == targetUUID
        );
      });
      if (edge) {
        dir = 1;
      } else {
        edge = this.graph.find("edge", (edge) => {
          return (
            edge._cfg.source._cfg.id == targetUUID &&
            edge._cfg.target._cfg.id == sourceUUID
          );
        });
        dir = 0;
      }

      if (dir == 1) {
        if (!isBGP) {
          this.graph.setItemState(edge, "ICMP_0", true);
          this.graph.setItemState(edge, "ICMP_0", false);
        } else {
          this.graph.setItemState(edge, "BGP_0", true);
          this.graph.setItemState(edge, "BGP_0", false);
        }
      } else {
        if (!isBGP) {
          this.graph.setItemState(edge, "ICMP_1", true);
          this.graph.setItemState(edge, "ICMP_1", false);
        } else {
          this.graph.setItemState(edge, "BGP_1", true);
          this.graph.setItemState(edge, "BGP_1", false);
        }
      }
    },
    updateCurRouteInfo(res) {
      this.curRouteInfo = [];
      var da = JSON.parse(res.data);
      var routeArr = da.interface;
      console.log(routeArr);
      for (var j = 0, len = routeArr.length; j < len; j++) {
        //console.log(routeArr[j]);
        routeArr[j].interface.forEach((el) => {
          el["last"] = j == len - 1;
          this.curRouteInfo.push(el);
        });
      }
    },

    updateCurCommandInfo(res) {
      //console.log(res);
      var msg = JSON.parse(res.data);
      if (this.curCommandInfo[this.curCommandName] == null) {
        this.curCommandInfo[this.curCommandName] = new Array();
      }
      this.curCommandInfo[this.curCommandName].unshift(msg.mssage);
    },

    executeCommand() {
      this.socket.emit("exchange_info", {
        uuid: this.curCommandId,
        command: this.curCommand,
      });
      this.socket.on("exchange_info", this.updateCurCommandInfo);
    },
    showCharts(item) {
      //改变当前chartname
      const group = item.getContainer();
      const labelShape = group.find((e) => e.get("name") === "text-shape");
      this.curChartName = labelShape["attrs"]["text"];
      this.myChart.setOption({
        title: {
          text: "Traffic_Chart(" + this.curChartName + ")",
        },
        series: [
          {
            data: this.curFromChartInfo[this.curChartName],
          },
        ],
      });
    },
    getNodeName(item) {
      const group = item.getContainer();
      const labelShape = group.find((e) => e.get("name") === "text-shape");
      return labelShape["attrs"]["text"];
    },
    showRouteinfo(item) {
      const group = item.getContainer();
      const labelShape = group.find((e) => e.get("name") === "text-shape");
      this.curRouteId = group["cfg"]["id"];
      this.curRouteName = labelShape["attrs"]["text"];
      this.socket.emit("deviceRouterInfo", { id: this.curRouteId });
      this.socket.on("route_info", this.updateCurRouteInfo);
      this.showroute = true;
    },
    showCommandWindow(item) {
      const group = item.getContainer();
      const labelShape = group.find((e) => e.get("name") === "text-shape");
      if (this.curCommandId != group["cfg"]["id"]) {
        this.curCommandId = group["cfg"]["id"];
      }
      this.curCommandName = labelShape["attrs"]["text"];
      this.showcommand = true;
    },
    importScript(url) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
      document.head.appendChild(script);
    },
    importCSS(url) {
      var link = document.createElement("link");
      link.async = true;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    },

    starttopo() {
      console.log("starting....");
      this.socket.emit("start", { data: "start" });
      this.socket.on("bgpfinished", this.enableMouse);
      this.socket.on("traffic_info", this.trafficInfoHandler);
      this.socket.on("alert_info", this.alertInfo);
    },

    alertInfo(res) {
      var data = JSON.parse(res["msg"]);
      var anomaly_as = [];
      var type = [];
      var time = data[0]["timestamp"];
      console.log(data);
      data.forEach((obj) => {
        if (anomaly_as.indexOf(obj["anomaly_as"]) == -1) {
          anomaly_as.push(obj["anomaly_as"]);
        }
        if (type.indexOf(obj["type"]) == -1) {
          type.push(obj["type"]);
        }
      });
      console.log(anomaly_as);
      console.log(type);
      var text = "";
      text += "anomaly_as: ";
      anomaly_as.forEach((id) => {
        text += id;
        text += " ";
      });
      text += "\n";
      text += "type: ";
      type.forEach((type) => {
        text += type;
        text += " ";
      });
      text += "\n";
      text += "time: ";
      text += time;
      swal("警告", text, "warning");
    },

    enableMouse() {
      this.bgpfinished = true;
    },

    getrouterinfo() {
      console.log("getrouterinfo....");
      this.socket.emit("deviceRouterInfo", { data: "deviceRouterInfo" });
    },

    getexchangeinfo() {
      console.log("getexchangeinfo....");
      this.socket.emit("exchange_info", { data: "exchangeinfo" });
    },

    createtopo() {
      /*console.log("createing....");
      console.log(JSON.stringify(info.hostinfo));
      var namespace = "/sp_keepalive";
      this.socket = io.connect(namespace);
      this.socket.on("connect", function () {
        console.log("connect success");
      });*/
      this.socket.emit("createTopo", {
        hostinfo: JSON.stringify(this.host),
        routerinfo: JSON.stringify(this.route),
        linkinfo: JSON.stringify(this.link),
      });
      this.socket.on("createTopo", this.creatrTopoHandler);
    },

    creatrTopoHandler(status) {
      if (status.code == 1) {
        alert(status.message);
      } else {
        this.starttopo();
      }
    },

    getTopoInfo() {
      var namespace = "/sp_keepalive";
      this.socket = io.connect(namespace);
      this.socket.on("connect", function () {
        console.log("connect success");
      });
      this.getNodeInfo();
      this.getEdgeInfo();
    },

    getNodeInfo() {
      this.socket.emit("getTopoNodes", { code: 0 });
      this.socket.on("getTopoNodes", this.analyzeNodes);
    },

    getEdgeInfo() {
      this.socket.emit("getTopoLinks", { code: 0 });
      this.socket.on("getTopoLinks", this.analyzeEdges);
    },

    analyzeNodes(res) {
      var nodes = JSON.parse(res.msg);
      nodes.forEach((node) => {
        if (node.type == "host") {
          this.host.push(node);
        } else {
          this.route.push(node);
        }
        //console.log(node);
        var cur = {};
        cur.type = node.type == "host" ? "pc" : "route";
        cur.id = node.uuid;
        cur.size = 40;
        this.curFromChartInfo[node.name] = [];
        this.curToChartInfo[node.name] = [];
        this.curChartName = node.name;
        cur.label = node.name;
        this.graphData.nodes.push(cur);
      });
      var cur = {};
      cur.type = "image";
      cur.img = require("../../assets/images/legend.png");
      cur.x = 700;
      cur.y = 600;
      cur.size = 100;
      this.graphData.nodes.push(cur);
      console.log("分析点完成");
      this.readNodesFinish = true;
      if (this.readEdgesFinish) {
        this.drawGraph();
        this.drawLine();
      }
    },

    analyzeEdges(res) {
      var edges = JSON.parse(res.msg);
      edges.forEach((edge) => {
        this.link.push(edge);
        var connection = edge.connection;
        var cur = {};
        cur.type = "circle-running";
        cur.id = edge.uuid;
        cur.source = connection[0].uuid;
        cur.sourceName = connection[0].name;
        cur.target = connection[1].uuid;
        cur.targetName = connection[1].name;
        cur.label = [connection[0].ip, connection[1].ip];
        this.graphData.edges.push(cur);
      });
      console.log("分析边完成");
      this.readEdgesFinish = true;
      if (this.readNodesFinish) {
        this.drawGraph();
        this.drawLine();
      }
    },

    refreshDragedNodePosition(e) {
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    },

    drawGraph() {
      insertCss(`
        .g6-component-tooltip {
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0px 0px 0px 0px;
        box-shadow: rgb(174, 174, 174) 0px 0px 10px;
        }
      `);
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 20,
        getContent(e) {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          //outDiv.style.length = 'fit-content';
          //outDiv.style.width = "180px";
          outDiv.innerHTML = `
      <ul>
        <li> ${e.item.getModel().sourceName} : ${
            e.item.getModel().label[0]
          }</li>
        <li> ${e.item.getModel().targetName} : ${
            e.item.getModel().label[1]
          }</li>
      </ul>`;
          return outDiv;
        },
        itemTypes: ["edge"],
      });
      this.graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: document.documentElement.clientWidth *0.6, // Number，必须，图的宽度
        height: document.documentElement.clientHeight * 0.7, // Number，必须，图的高度
        plugins: [tooltip],
        layout: {
          type: "force",
          preventOverlap: true,
          //linkDistance: 300,
         /* linkDistance: (d) => {
            if (!d.source.isLeaf || !d.target.isLeaf) {
              return 100;
            }
            return 30;
          },*/
          /*nodeStrength: (d) => {
            if (d.isLeaf) {
              return -50;
            }
            return -10;
          },*/
          /*edgeStrength: (d) => {
            if(!d.source.isLeaf && !d.target.isLeaf){
              return 0.1;
            }
          },*/
          nodeSize: 30,
          onTick: () => {
            console.log(this.graph);
          },
        },
        fitView: true,
        animate: true,
        modes: {
          default: ["drag-canvas"],
        },
      });
      //this.graph.data(this.graphData); // 读取 Step 2 中的数据源到图上
      this.graph.data(data2);
      this.graph.render(); // 渲染图
      this.graph.on("node:click", (ev) => {
        if (ev.item["_cfg"]["currentShape"] == "route") {
          this.showRouteinfo(ev.item);
          this.showCommandWindow(ev.item);
          this.showCharts(ev.item);
        } else {
          this.showCommandWindow(ev.item);
          this.showCharts(ev.item);
        }
      });
      this.graph.on("edge:mouseenter", (evt) => {
        const { item } = evt;
        //console.log(item);
        this.graph.setItemState(item, "active", true);
      });

      this.graph.on("edge:mouseleave", (evt) => {
        const { item } = evt;
        this.graph.setItemState(item, "active", false);
      });

      /*this.graph.on("node:dragstart", function (e) {
        this.graph.layout();
        this.refreshDragedNodePosition(e);
      });
      this.graph.on("node:drag", function (e) {
        this.refreshDragedNodePosition(e);
      });
      this.graph.on("node:dragend", function (e) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });*/
      console.log("画图成功");
    },
    init() {
      this.drawGraph();
      //this.createtopo();
      //this.getTopoInfo();
    },
  },
};
</script>



<style>
@import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
@import "https://www.huangwx.cn/css/sweetalert.css";
.outerDiv {
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  z-index: 10;
  filter: Alpha(Opacity=50);
  background-color: #fdfdfd;
}
.noneclick {
  pointer-events: none;
}
.box {
  position: relative;
}
.box div {
  height: 100%;
}
.left {
  float: left;
  left: 0;
  width: 60%;
  border-right: 2px solid #ddd;
}
.right {
  width: 30%;
  margin-left: 50px;
  float: left;
}
</style>


 <style type="text/css">
.route {
  width: 50%;
  float: right;
}
.command {
  width: 50%;
  float: left;
}
.tx {
  width: 100%;
}
.txinput {
  margin-top: 10px;
  width: 80%;
}
.txbtn {
  width: 18%;
  margin-left: 4px;
}
.left {
  padding: 10px;
}
.oldRoute {
  color: #7d7c83;
}
.newRoute {
  color: #0000ff;
}
</style>
