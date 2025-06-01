import { createStore } from "solid-js/store";


const def_forwardingTable = [{ showMobilePopup: "b2:77:3a:8c:14:5f", port: "to 255" }]// Array(8).fill().map(() => ({ destinationMac: "", port: "" }))

export const [forwardingTable, setForwardingTable] = createStore(def_forwardingTable);
