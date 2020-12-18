import uid from "./uid"
function guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const info = {
    hostinfo: [
        {
            "name": "PC11",
            "uuid": uid.host1_uid,
            "type": "host"
        }, {
            "name": "PC55",
            "uuid": uid.host2_uid,
            "type": "host"
        }, {
            "name": "PC33",
            "uuid": uid.host3_uid,
            "type": "host"
        }]
    ,
    routerinfo: [
        {
            "name": "router01",
            "uuid": uid.router1_uid,
            "type": "AS"
        }, {
            "name": "router02",
            "uuid": uid.router2_uid,
            "type": "AS"
        }, {
            "name": "router03",
            "uuid": uid.router3_uid,
            "type": "AS"
        }, {
            "name": "router04",
            "uuid": uid.router4_uid,
            "type": "AS"
        }, {
            "name": "router05",
            "uuid": uid.router5_uid,
            "type": "AS"
        }
    ],
    linkinfo: [{
        "name": "link01",
        "uuid": uid["PC11-route1_uid"],
        "connection": [
            {
                "name": "pc11",
                "uuid": uid.host1_uid,
                "ip": "11.0.0.11",
                "netmask": "255.255.0.0",
                "gateway": "192.168.111.1"
            },
            {
                "name": "router01",
                "uuid": uid.router1_uid,
                "ip": "11.0.0.1",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link02",
        "uuid": uid["route2-route1_uid"],
        "connection": [
            {
                "name": "router02",
                "uuid": uid.router2_uid,
                "ip": "192.168.12.2",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "router01",
                "uuid": uid.router1_uid,
                "ip": "192.168.12.1",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link03",
        "uuid": uid["route2-route3_uid"],
        "connection": [
            {
                "name": "router02",
                "uuid": uid.router2_uid,
                "ip": "192.168.23.2",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "router03",
                "uuid": uid.router3_uid,
                "ip": "192.168.23.3",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link04",
        "uuid": uid["route2-route4_uid"],
        "connection": [
            {
                "name": "router02",
                "uuid": uid.router2_uid,
                "ip": "192.168.24.2",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "router04",
                "uuid": uid.router4_uid,
                "ip": "192.168.24.4",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link05",
        "uuid": uid["route3-route4_uid"],
        "connection": [
            {
                "name": "router03",
                "uuid": uid.router3_uid,
                "ip": "192.168.34.3",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "router04",
                "uuid": uid.router4_uid,
                "ip": "192.168.34.4",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link06",
        "uuid": uid["route4-route5_uid"],
        "connection": [
            {
                "name": "router05",
                "uuid": uid.router5_uid,
                "ip": "192.168.45.5",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "router04",
                "uuid": uid.router4_uid,
                "ip": "192.168.45.4",
                "netmask": "255.255.255.0",
                "gateway": ""
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link07",
        "uuid": uid["PC55-route5_uid"],
        "connection": [
            {
                "name": "router05",
                "uuid": uid.router5_uid,
                "ip": "55.0.0.1",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "PC55",
                "uuid": uid.host2_uid,
                "ip": "55.0.0.55",
                "netmask": "255.255.0.0",
                "gateway": "192.168.115.1"
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }, {
        "name": "link08",
        "uuid": uid["PC33-route3_uid"],
        "connection": [
            {
                "name": "router03",
                "uuid": uid.router3_uid,
                "ip": "11.0.0.1",
                "netmask": "255.255.255.0",
                "gateway": ""
            },
            {
                "name": "PC33",
                "uuid": uid.host3_uid,
                "ip": "11.0.0.11",
                "netmask": "255.255.0.0",
                "gateway": "192.168.111.1"
            }
        ],
        "condition": {
            "delay": "5ms",
            "bandwith": "5Mbps",
            "loss": "0.1"
        }
    }
    ]
}

export default info