<template>
  <div>
    <div class="box">
      <div class="left">
        <select id="selector">
          <option value="default">Default mode</option>
          <option value="val1">animate1</option>
          <option value="val2">animate2</option>
        </select>
        <div>
          <button @click="createtopo">create</button>
          <button @click="bgp">bgp_protocol</button>
          <button @click="starttopo">start</button>
          <button>attack</button>
          <button>stop</button>
        </div>
        <div>
          <button>+</button>
          <button>-</button>
        </div>
        <div id="mountNode">
          <div v-show="showroute">
            <textarea>routeinfo</textarea>
          </div>
          <div v-show="showcommand">
            <textarea>command</textarea>
          </div>
          <edges />
        </div>
      </div>
      <div class="right">
        <h1>TRAFFIC INFO</h1>
        <table cellpadding="10">
          <tr>
            <th>sourceIP</th>
            <th>sourcePort</th>
            <th>destinationIP</th>
            <th>destinationPort</th>
            <th>protocol</th>
          </tr>
          <tr>
            <td>192.168.11.11</td>
            <td>2322</td>
            <td>192.168.11.1</td>
            <td>4534</td>
            <td>tcp</td>
          </tr>
          <tr>
            <td>192.168.11.11</td>
            <td>2322</td>
            <td>192.168.11.1</td>
            <td>4534</td>
            <td>tcp</td>
          </tr>
          <tr>
            <td>192.168.11.11</td>
            <td>2322</td>
            <td>192.168.11.1</td>
            <td>4534</td>
            <td>tcp</td>
          </tr>
          <tr>
            <td>192.168.11.11</td>
            <td>2322</td>
            <td>192.168.11.1</td>
            <td>4534</td>
            <td>tcp</td>
          </tr>
          <tr>
            <td>192.168.11.11</td>
            <td>2322</td>
            <td>192.168.11.1</td>
            <td>4534</td>
            <td>tcp</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
import edges from "../Edges";
import G6 from "@antv/g6";
import data from "./data";
import axios from "axios";
import info from "./info";

export default {
  name: "page",
  components: {
    edges,
  },
  data() {
    return {
      graph: null,
      socket: null,
      switchinfo: null,
      showroute: false,
      showcommand: false,
    };
  },
  mounted() {
    this.createdLoca();
    this.$nextTick(() => {
      console.log("page组件初始化.....");
      this.init();
    });
  },
  methods: {
    showRouteinfo() {
      console.log(this.showroute);
      this.showroute = true;
    },
    showCommandWindow() {
      console.log(this.showcommand);
      this.showcommand = true;
    },
    createdLoca() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "//cdn.bootcss.com/socket.io/1.5.1/socket.io.min.js";
      document.head.appendChild(script);
    },
    starttopo() {
      console.log("starting....");
      this.socket.emit("start", { data: "start" });
      //this.socket.emit("traffic_info", { data: "topodata" });
      this.socket.on("traffic_info", function (res) {
        console.log(res);
      });
    },
    bgp() {
      this.socket.emit("bgp_protocol", { data: "bgp" });
      this.socket.on("bgp_protocol", function (res) {
        console.log(res);
      });
    },
    createtopo() {
      console.log("createing....");
      var namespace = "/sp_keepalive";
      this.socket = io.connect(namespace);
      this.socket.on("connect", function () {
        // 连接成功时的事件
        console.log("connect success");
      });
      this.socket.emit("createTopo", { data: "create" });
      this.socket.on("createTopo", function (res) {
        console.log(res);
      });
    },
    init() {
      this.graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: document.documentElement.clientWidth / 2, // Number，必须，图的宽度
        height: document.documentElement.clientHeight, // Number，必须，图的高度
        layout: {
          //type: "force",
          preventOverlap: true,
          //nodeSize: 30,
        },
        //fitView: true,
        animate: true,
        modes: {
          default: ["click-select"],
        },
      });
      console.log(data);
      this.graph.data(data); // 读取 Step 2 中的数据源到图上
      this.graph.render(); // 渲染图
      this.graph.on("node:click", (ev) => {
        console.log("clicked......");
        console.log(ev);
        const shape = ev.target;
        const node = ev.item;
        //this.showRouteinfo();
      });
      /*this.graph.on("node:dblclick", (ev) => {
        console.log("doubleclicked......");
        console.log(ev);
        this.showCommandWindow();
      });*/
      document.getElementById("selector").addEventListener("change", (e) => {
        const value = e.target.value;
        const edge = this.graph.findById("2");
        if (value === "val1") {
          this.graph.setItemState(edge, "val1", true);
          this.graph.setItemState(edge, "val1", false);
        } else if (value === "val2") {
          this.graph.setItemState(edge, "val2", true);
          this.graph.setItemState(edge, "val2", false);
        } else {
          /* this.graph.setItemState(edge, "val1", false);
          this.graph.setItemState(edge, "val2", false);*/
        }
      });
    },
  },
};
</script>



<style>
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
