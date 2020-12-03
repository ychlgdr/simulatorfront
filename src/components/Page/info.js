const info = {
    hostinfo: [
        {
            "name": "host01",
            "id": "host01",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.111.11",
                    "netmask": "255.255.255.0",
                    "gateway": "192.168.111.1"
                }
            ],
            "direct_conn": [
                {
                    "name": "router01",
                    "id": "router01"
                }
            ]
        }, {
            "name": "host02",
            "id": "host02",
            "interface": [
                {
                    "nic_name": "eth02",
                    "ip": "192.168.115.11",
                    "netmask": "255.255.255.0",
                    "gateway": "192.168.115.1"
                }
            ],
            "direct_conn": [
                {
                    "name": "router05",
                    "id": "router05"
                }
            ]
        }, {
            "name": "host03",
            "id": "host03",
            "interface": [
                {
                    "nic_name": "eth03",
                    "ip": "192.168.111.11",
                    "netmask": "255.255.255.0",
                    "gateway": "192.168.111.1"
                }
            ],
            "direct_conn": [
                {
                    "name": "router03",
                    "id": "router03"
                }
            ]
        }]
    ,
    routerinfo: [
        {
            "name": "router01",
            "id": "router01",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.111.1",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.12.1",
                    "netmask": "",
                    "gateway": ""
                }
            ]
        }, {
            "name": "router02",
            "id": "router02",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.12.2",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.23.2",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth03",
                    "ip": "192.168.24.2",
                    "netmask": "",
                    "gateway": ""
                }
            ]
        }, {
            "name": "router03",
            "id": "router03",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.111.1",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.23.3",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth03",
                    "ip": "192.168.34.3",
                    "netmask": "",
                    "gateway": ""
                }
            ]
        }, {
            "name": "router04",
            "id": "router04",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.24.4",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.34.4",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.45.4",
                    "netmask": "",
                    "gateway": ""
                }
            ]
        }, {
            "name": "router05",
            "id": "router05",
            "interface": [
                {
                    "nic_name": "eth01",
                    "ip": "192.168.45.5",
                    "netmask": "",
                    "gateway": ""
                },
                {
                    "nic_name": "eth02",
                    "ip": "192.168.115.1",
                    "netmask": "",
                    "gateway": ""
                }
            ]
        }
    ],
    linkinfo:[{
        "name": "link01",
        "id":"link01",
        "connection": [
            {
                "name": "pc11",
                "id":"host01"
            },
            {
                "name": "router01",
                "id": "router01"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link02",
        "id":"link02",
        "connection": [
            {
                "name": "router02",
                "id":"router02"
            },
            {
                "name": "router01",
                "id": "router01"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link03",
        "id":"link03",
        "connection": [
            {
                "name": "router02",
                "id":"router02"
            },
            {
                "name": "router03",
                "id": "router03"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link04",
        "id":"link04",
        "connection": [
            {
                "name": "router02",
                "id":"router02"
            },
            {
                "name": "router04",
                "id": "router04"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link05",
        "id":"link05",
        "connection": [
            {
                "name": "router03",
                "id":"router03"
            },
            {
                "name": "router04",
                "id": "router04"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link06",
        "id":"link06",
        "connection": [
            {
                "name": "router05",
                "id":"router05"
            },
            {
                "name": "router04",
                "id": "router04"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link07",
        "id":"link07",
        "connection": [
            {
                "name": "router05",
                "id":"router05"
            },
            {
                "name": "PC51",
                "id": "host02"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    },{
        "name": "link08",
        "id":"link08",
        "connection": [
            {
                "name": "router03",
                "id":"router03"
            },
            {
                "name": "PC31-attacker",
                "id": "host03"
            }
        ],
        "condition": {
                "delay": "5ms",
                "bandwith":"5Mbps",
                "loss":"0.1"
            }     
    }
]
}

export default info