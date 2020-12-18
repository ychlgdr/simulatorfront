import uid from "./uid"
console.log(uid)
//console.log(uid.router3_uid)
const data = {
  // 点集
  nodes: [{
    img: require("../../assets/images/legend.png"),
    x: 700,
    y: 600,
    size: 100,
    type: 'image'
  }, {
    id: uid.router3_uid,
    label: 'route3',
    x: 300,
    y: 150,
    size: 40,
    type: 'route'
  }, {
    id: uid.router2_uid,
    label: 'route2',
    x: 100,
    y: 300,
    size: 40,
    type: 'route'
  }, {
    id: uid.router4_uid,
    label: 'route4',
    x: 500,
    y: 300,
    size: 40,
    type: 'route'
  }, {
    id: uid.router1_uid,
    label: 'route1',
    x: 90,
    y: 400,
    size: 40,
    type: 'route'
  }, {
    id: uid.router5_uid,
    label: 'route5',
    x: 510,
    y: 400,
    size: 40,
    type: 'route'
  }, {
    id: uid.host1_uid,
    label: 'PC11',
    x: 80,
    y: 500,
    size: 40,
    type: 'pc',
  }, {
    id: uid.host3_uid,
    label: 'PC33',
    x: 400,
    y: 150,
    size: 40,
    type: 'pc'
  }, {
    id: uid.host2_uid,
    label: 'PC55',
    x: 520,
    y: 500,
    size: 40,
    type: 'pc',
  }],
  // 边集
  edges: [{
    id: uid["route2-route3_uid"],
    source: uid.router3_uid,
    sourceName: "route3",
    target: uid.router2_uid,
    targetName: "route2",
    label: ['192.168.23.3', '192.168.23.2'],
    type: 'circle-running'
  }, {
    id: uid["route3-route4_uid"],
    source: uid.router3_uid,
    sourceName: "route3",
    target: uid.router4_uid,
    targetName: "route4",
    label: ['192.168.34.3', '192.168.34.4'],
    type: 'circle-running'
  }, {
    id: uid["route2-route4_uid"],
    source: uid.router2_uid,
    sourceName: "route2",
    target: uid.router4_uid,
    targetName: "route4",
    label: ['192.168.24.2', '192.168.24.4'],
    type: 'circle-running'
  }, {
    id: uid["route2-route1_uid"],
    source: uid.router2_uid,
    sourceName: "route2",
    target: uid.router1_uid,
    targetName: "route1",
    label: ['192.168.12.2', '192.168.12.1'],
    type: 'circle-running'
  }, {
    id: uid["route4-route5_uid"],
    source: uid.router4_uid,
    sourceName: "route4",
    target: uid.router5_uid,
    targetName: "route5",
    label: ['192.168.45.4', '192.168.45.5'],
    type: 'circle-running'
  }, {
    id: uid["PC11-route1_uid"],
    source: uid.router1_uid,
    sourceName: "route1",
    target: uid.host1_uid,
    targetName: "PC11",
    label: ['192.168.111.11', '192.168.111.1'],
    type: 'circle-running'
  }, {
    id: uid["PC55-route5_uid"],
    source: uid.router5_uid,
    sourceName: "route5",
    target: uid.host2_uid,
    targetName: "PC55",
    label: ['192.168.155.11', '192.168.155.1'],
    type: 'circle-running'
  }, {
    id: uid["PC33-route3_uid"],
    source: uid.router3_uid,
    sourceName: "route3",
    target: uid.host3_uid,
    targetName: "PC33",
    label: ['192.168.111.1', '192.168.111.11'],
    type: 'circle-running'
  }]
};

export default data;