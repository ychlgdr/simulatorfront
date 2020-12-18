
function guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const uid = {
    "host1_uid" : guid(),
    "host2_uid" : guid(),
    "host3_uid" : guid(),
    "router1_uid" : guid(),
    "router2_uid" : guid(),
    "router3_uid" : guid(),
    "router4_uid" : guid(),
    "router5_uid" : guid(),
    "PC11-route1_uid" : guid(),
    "route2-route1_uid" : guid(),
    "route2-route3_uid" : guid(),
    "route2-route4_uid" : guid(),
    "route3-route4_uid" : guid(),
    "PC33-route3_uid" : guid(),
    "route4-route5_uid" : guid(),
    "PC55-route5_uid" : guid(),
}

export default uid