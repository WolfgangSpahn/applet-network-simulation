// Define Nodes (with id, position, and type ["printer", "tv", "cloud", "mobile", "computer", "switch", "router", "source", "destination"])
export const nodes_data = [
    { id: 0, color:"red", position: [370, 320], type: "cloud"    , role: "leaf",        mac: "b2:77:3a:8c:14:5f", subnet: "213.3"    , name: "Swisscom"  },
    { id: 1, color:"white", position: [250, 250], type: "Switch"   , role: "transit",     mac: "1c:4f:9b:2d:63:e1", subnet: "192.168.1", name: "WLAN-B" , forwarding:"clientIsolation" },
    { id: 4, color:"blue", position: [100, 400], type: "computer" , role: "source",      mac: "03:aa:66:de:9e:21", subnet: "192.168.1", name: "My Laptop" },
    { id: 13, color:"green", position: [100, 100], type: "printer"  , role: "destination", mac: "fe:08:d8:75:82:a0", ip: "10.0.0.4", name: "HPP 1000" },
    { id: 61, color:"purple", position: [100, 250], type: "tv"       , role: "leaf",        mac: "7a:10:fe:88:3c:93", subnet: "192.168.1", name: "Samsung HDTV" },
    { id: 76, color:"orange", position: [250, 100], type: "mobile"   , role: "leaf",        mac: "e5:3b:cd:1a:f7:08", subnet: "192.168.1", name: "My Phone"  },
    { id: 255, color:"pink", position: [250, 320], type: "router"   , role: "transit",     mac: "b2:77:3a:8c:14:5f", subnet: "192.168.1", name: "WLAN-R" }
  ];
  
  // Define Edges (with id and connected nodes), and type ["wireless", "internal", "fixed"]
export const edges = [
    { id: 1, nodes: [13, 1], type: "wireless" },
    { id: 2, nodes: [1, 255], type: "internal"  },
    { id: 3, nodes: [1, 4], type: "wireless"  },
    { id: 4, nodes: [255, 0], type: "fixed"  },
    { id: 5, nodes: [1, 61], type: "wireless"  },
    { id: 6, nodes: [1, 76], type: "wireless"  }
  ];