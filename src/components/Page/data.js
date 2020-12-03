const data = {
    // 点集
    nodes: [{
      id: 'route3',
      label: 'route3',
      x: 300,
      y:150,
      img: require("../../assets/images/route.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'route2',
      label: 'route2',
      x: 100,
      y:300,
      img: require("../../assets/images/route.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'route4',
      label: 'route4',
      x: 500,
      y:300,
      img: require("../../assets/images/route.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'route1',
      label: 'route1',
      x: 100,
      y:400,
      img: require("../../assets/images/route.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'route5',
      label: 'route5',
      x: 500,
      y:400,
      img: require("../../assets/images/route.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'PC11',
      label: 'PC11',
      x: 100,
      y:500,
      img: require("../../assets/images/pc.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    },{
      id: 'PC31',
      label: 'PC31-attacker',
      x: 400,
      y:150,
      img: require("../../assets/images/pc.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }, {
      id: 'PC51',
      label: 'PC51',
      x: 500,
      y:500,
      img: require("../../assets/images/pc.png"),
      size: 40,
      type: 'image',
      labelCfg: {
        position: 'bottom'
      }
    }],
    // 边集
    edges: [{

      source: 'route3',
      target: 'route2',
      label: ['192.168.23.3', '192.168.23.2'],
      type: 'circle-running'
    }, {
      id: "1",
      source: 'route3',
      target: 'route4',
      //label: ['192.168.23.3', '192.168.23.2'],
      type: 'circle-running'
    }, {
      id: "2",
      source: 'route2',
      target: 'route4',
      type: 'circle-running'
    }, {
      source: 'route2',
      target: 'route1',
      type: 'circle-running'
    }, {
      source: 'route4',
      target: 'route5',
      type: 'circle-running'
    }, {
      source: 'route1',
      target: 'PC11',
      type: 'circle-running'
    }, {
      source: 'route5',
      target: 'PC51',
      type: 'circle-running'
    }, {
      source: 'route3',
      target: 'PC31',
      type: 'circle-running'
    }]
  };
  
  export default data;