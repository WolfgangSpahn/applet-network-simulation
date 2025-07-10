import { createStore } from "solid-js/store";


const def_forwardingTable = []// Array(8).fill().map(() => ({ destinationMac: "", port: "" }))

export const [forwardingTable, setForwardingTable] = createStore(def_forwardingTable);
