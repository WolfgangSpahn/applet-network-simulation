import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import Switch from "./Switch.jsx";
import Router from "./Router";
import Computer from "./Computer";
import Printer from "./Printer";
import TV from "./TV";
import Cloud from "./Cloud";
import Mobile from "./Mobile";
import SwitchPref from "./SwitchPref.jsx"; 
import ComputerPref from "./ComputerPref";
import ComputerPopUp from "./ComputerPopUp"; 
import PrinterPref from "./PrinterPref";
import NotifyPrintTestPage from "./NotifyPrintTestPage";
import SelectPrinterDialog from "./SelectPrinterDialog";
import Tooltip from "./Tooltip";
import TooltipSVG from "./TooltipSVG";
import { forwardingTable, setForwardingTable } from "./FWDTableStore";
// import data
import { nodes_data, edges } from "./data.js";



let thread = [4, 1, [255]] //, [1, 3, 6, 7]];
let unicastThread = [4, 1, 255]; // Unicast thread for the animation
let broadcastThread1 = [4, 1, [61, 255, 76, 13]]; // Broadcast thread /wo client isolation for the animation
let broadcastThread0 = [4, 1, 255 ];           // Broadcast thread /w client isolation for the animation

function getValidThreads(currentNodes, nextNodes, threadIndex) {
  let validThreads = [];

  // Ensure we have arrays for iteration
  let currentNodesArray = Array.isArray(currentNodes) ? currentNodes : [currentNodes];
  let nextNodesArray = Array.isArray(nextNodes) ? nextNodes : [nextNodes];

  // Find valid edges between current nodes and next nodes
  currentNodesArray.forEach(currentNode => {
      nextNodesArray.forEach(nextNode => {
          if (edges.some(edge => edge.nodes.includes(currentNode) && edge.nodes.includes(nextNode))) {
              validThreads.push({ threadIndex, nodeId: currentNode, nextNodeId: nextNode });
          }
      });
  });

  return validThreads;
}


let pathRefs = []; // Store path references globally


// --------------------------------------------------------------------------------------------------------
const App = () => {
  //const [positions, setPositions] = createSignal([{ id: thread[0], pos: getNodeById(thread[0]).position }]);
  const [targetColor, setTargetColor] = createSignal("white"); // Track target color
  const [sourceColor, setSourceColor] = createSignal("blue"); // Track source color
  const [discoveredPrinter, setDiscoveredPrinter] = createSignal(false); // Track broadcast state
  const [clickedSwitch, setClickedSwitch] = createSignal(null); // Track selected Switch
  const [clickedComputer, setClickedComputer] = createSignal(null); // Track selected computer
  const [showSwitchPref, setShowSwitchPref] = createSignal(false); // Track SwitchPref visibility
  const [showComputerPref, setShowComputerPref] = createSignal(false); // Track Computer
  const [showPopUp, setShowPopUp] = createSignal(false); // Track PopUp visibility
  
  const [clickedPrinter, setClickedPrinter] = createSignal(null); // Track selected printer

  const [showPrinterPref, setShowPrinterPref] = createSignal(false); // Track PrinterPref visibility
  const [showNotification, setShowNotification] = createSignal(false); // Track notification visibility
  const [message, setMessage] = createSignal(""); // Track notification message
  const [showPrinterSelect, setShowPrinterSelect] = createSignal(false); // Track PrinterSelect visibility
  const [availablePrinters, setAvailablePrinters] = createSignal([]); // Available printers { id: 1, name: "Printer 1" },
  // stores
  const [nodes, setNodes] = createStore(nodes_data); // Store nodes data
  // get node by id
  const getNodeById = (id) => nodes.find(node => node.id === id);
  // allowed ports for the Switch 
  const [allowedPorts, setAllowedPorts] = createSignal([255]);
  const [selectedPrinter, setSelectedPrinter] = createSignal(null); // Track selected printer

  // Helper: Find node by ID
  // const getNodeById = id => nodes_data.find(node => node.id === id);
  //const [computerPreferences, setComputerPreferences] = createStore({}); // Store node preferences { nodeId: { name, mac, subnet, id } }
  //const [printerPreferences, setPrinterPreferences] = createStore({}); // Store printer preferences { nodeId: { name, subnet, id } }

  const handleDeviceClick = (node) => {
    // deep copy unicastThread
    thread = JSON.parse(JSON.stringify(unicastThread));
    thread[0] = node.id;
    // get last nodes id in thread
    let lastNodeIds = thread[thread.length - 1];
    // lasst node can be a number: if number convert it to array
    lastNodeIds = Array.isArray(lastNodeIds) ? lastNodeIds : [lastNodeIds];
    // get the last nodes
    let lastNodes = lastNodeIds.map(id => getNodeById(id));

    // update forwarding table entry for the selected computer [{ destinationMac: "b2:77:3a:8c:14:5f", port: "to 255" }]
    // add forwarding table entry for each last node
    lastNodes.forEach(node => {
      // check if node.mac is not already in the forwarding table
      let entry = forwardingTable.find(entry => entry.destinationMac === node.mac);
      if (entry) {
        console.log("entry found:", entry);
        // update entry
        // entry.port = `to ${node.id === 0? 255 : node.id}`;
      } else {
        console.log("entry not found:", node.mac);
        // entry
        setForwardingTable(prev => [
          ...prev,
          { destinationMac: node.mac, port: `to ${node.id === 0? 255 : node.id}` }
        ]);
      }
    });
    // set forwarding table entry for the selected computer
    console.log("fwding table:", node.id, forwardingTable);
    setSourceColor(node.color); // Update source color based on node ID
    setTargetColor("white"); // Update target color to green
    redoAnimation();
    // Update the thread with the clicked node ID
    // alert(`Device ${node.id} clicked!`);
  };

  const handlePrinterClick = (node) => {
    console.log(`Printer ${node.id} clicked!`);
    // setShowPrinterPref(true);
    setClickedPrinter(node); // Set the clicked printer ID
  };

  const handleSwitchClick = (node) => {
    setShowSwitchPref(true);
    setClickedSwitch(node); // Set the clicked Switch ID
  };

  const handleComputerClick = (node) => {
    setShowPopUp(true);
    setClickedComputer(node); // Set the clicked computer ID

  };

  const handleComputerPreferences = (node) => {
    console.debug(`Preferences for Computer ${node.id}`);
    setShowComputerPref(true);
    setClickedComputer(node);
  }

  const handlePrinterSelect = (node) => {
    setShowPrinterSelect(true);
  };

  const handlePrinterIpChange = (id, data) => {
    console.log("Printer IP changed:", id, data);
    // change node ip with id
    setNodes((node) => node.id === id, "ip", data.ip );
  }

  const handlePrintTestPage = (computer) => {
    let printer = nodes.find(n => n.type === "printer");
    console.log("handlePrintTestPage: nodes:",nodes);
    console.log("handlePrintTestPage: available:",availablePrinters());
    console.log("handlePrintTestPage: computer:",computer);
    console.log("handlePrintTestPage: printer:",printer);  
    // check of print is available in availablePrinters
    if (availablePrinters().some(p => p.id === printer.id)) {
      console.log("handlePrintTestPage: Printer available");
      // check if printer ip is in the subnet of the computer
      if (printer && printer.ip.startsWith(computer.subnet)&&!printer.ip.endsWith(computer.id)) {
        // alert(`Print test page to ${printer.name}`);
        setMessage(`Print test page to ${printer.name}`);
        setShowNotification(true);
      } else {
        // alert(`Could not print test page to ${printer.name}`);
        setMessage(`Could not print test page to ${printer.name}`);
        setShowNotification(true);
      }
    } else {
      // alert(`Printer not available`);
      console.log("handlePrintTestPage: Printer not available");
      setMessage(`Printer not available`);
      setShowNotification(true);
    }
  }


  // Use createEffect to log the updated value

  createEffect(() => {
    console.log("broadcast has changed:", discoveredPrinter());
    // if 13 is in allowedPorts
    if (allowedPorts().includes(13)) {
    // if discoveredPrinter is true, set availablePrinters to [{ id: 1, name: "HPP 1000" }]
      setAvailablePrinters([{ id: 13, name: "HPP 1000" }]);
    } else {
      setAvailablePrinters([]);
    }
    }
  );
  
  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".Switch-pref") &&
      !event.target.closest(".popup") &&
      !event.target.closest(".computer-pref") &&
      !event.target.closest(".printer-pref")
    ) {
      cleanUp();
    }
  };

  const cleanUp = () => {
    setClickedSwitch(null);
    setClickedComputer(null);
    setClickedPrinter(null);
    setShowComputerPref(false);
    setShowSwitchPref(false);
    setShowPrinterPref(false);
    setShowPopUp(false);
  };
    

  const [isAnimating, setIsAnimating] = createSignal(false);
  const [currentStep, setCurrentStep] = createSignal(0);
  const [progress, setProgress] = createSignal(0);

  // --------------------------------------- JS animation logic ----------------------------------------
  // Reactive state for tracking positions
  const [positions, setPositions] = createSignal([]);
  // Tracks active moving threads (mutable, not a signal to avoid re-renders)
  let activeThreads = getValidThreads(thread[0], thread[1], 1);
  let step = 0;
  // Controls the animation loop
  let animationFrame = null; 
  // Ensures positions() only updates when circles are added/removed
  function updatePositions() {
    console.debug(`updatePositions: ${JSON.stringify(activeThreads)}`);
    setPositions(activeThreads.map(t => ({
        id: t.nextNodeId,
        pos: { x: getNodeById(t.nodeId).position[0], y: getNodeById(t.nodeId).position[1] }
    })));
  }

  // Moves circles without re-rendering
  function moveCircles() {
    console.debug(`movingCircles: ${JSON.stringify(activeThreads)}`);
    if (activeThreads.length === 0) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      console.debug("Animation complete!");
      return;
    }
    
    let newThreads = new Map();
    const steps = 30;

    activeThreads.forEach(({ threadIndex, nodeId, nextNodeId}) => {
        console.debug(`current: ${nodeId}`,`next: ${nextNodeId}`);
        // Find the path, edge index and edge for the current node and next node
        const edgeIndex = edges.findIndex(e => e.nodes.includes(nodeId) && e.nodes.includes(nextNodeId));
        if (edgeIndex === -1 || !pathRefs[edgeIndex]) {
          console.warn("Path not found for:", nodeId, "->", nextNodeId);
          return;
        }
        const path = pathRefs[edgeIndex];
        const edge = edges[edgeIndex];
        // Calculate the position of the circle along the path according to the step
        const length = path.getTotalLength();
        const reversePath = edge.nodes[0] !== nodeId;
        const adjustedProgress = reversePath ? 1 - (step + 1) / steps : (step + 1) / steps;
        const point = path.getPointAtLength(length * adjustedProgress);
        // Update the SVG DOM directly
        const element = document.getElementById(`circle-${nextNodeId}`);
        console.debug(`move circle-${nextNodeId}`);
        if (element) {
          element.setAttribute("cx", point.x);
          element.setAttribute("cy", point.y);
        } else {
          console.warn("Circle not found for:", nodeId);
        }
    });

    
    if (step + 1 < steps) {
      step++;
    } else {
      step = 0; // Reset step

      let newActiveThreads = [];
      activeThreads.forEach(({ threadIndex, nodeId, nextNodeId }) => {
          let nextNodes = thread[threadIndex + 1];
          let validNextThreads = getValidThreads(nextNodeId, nextNodes, threadIndex + 1);
          newActiveThreads.push(...validNextThreads);
      });
  
      activeThreads = newActiveThreads;
      updatePositions() // Update positions as we now might need more/less circles
    }

    if (activeThreads.length > 0) {
      animationFrame = requestAnimationFrame(moveCircles);
    } else {
      console.debug("Animation complete!");
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  // Starts animation loop
  function startAnimation() {
    if (!animationFrame) {
      console.debug("Starting animation...");
      updatePositions();
      animationFrame = requestAnimationFrame(moveCircles);
    }
  }

  // Stops animation loop
  function stopAnimation() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      console.debug("Animation stopped.");
    }
  }

  function redoAnimation() {
    console.debug("Redoing animation...");
    // Reset animation state
    step = 0;
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    // Reinitialize active threads
    activeThreads = getValidThreads(thread[0], thread[1], 1);
    // Reset positions for all initial circles
    updatePositions();
    // Restart animation
    animationFrame = requestAnimationFrame(moveCircles);
  }

  // --------------------------------------- end JS animation logic ------------------------------------

  onCleanup(() => stopAnimation());
  
  onMount(() => {
    startAnimation();
  });

  onCleanup(() => {
    cancelAnimationFrame(animationFrame);
  });

  return (
    <div class="bg-gray-900 relative border text-sm" onClick={handleOutsideClick}> 
    <svg width="500" height="500">
      {edges.map((edge, index) => {
        const startNode = getNodeById(edge.nodes[0]);
        const endNode = getNodeById(edge.nodes[1]);

        return (
          <path
            ref={(el) => (pathRefs[index] = el)}
            d={`M ${startNode.position[0]} ${startNode.position[1]} L ${endNode.position[0]} ${endNode.position[1]}`}
            stroke="white"
            fill="none"
            stroke-width={edge.type === "internal"? "8" : "1"}
            stroke-dasharray={edge.type === "wireless"? "5,5" : "0"}
          />
        );
      })}
      {/* draw text to top right of the viewport */}
      <text x={10} y={30} fill="white" fontSize="12" fontWeight="bold">
        Subnet: {"192.168.1"}
      </text>
      {nodes.map((node) => (
        <g>
            {/* Draw either Switch or Computer based on node type */}
            {node.type === "Switch" ? (
          <Switch
            x={node.position[0]}
            y={node.position[1]}
            scale={1}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Switch
              handleSwitchClick(node);
            }}
          />
        ) : node.type === "router" ? (
          <Router
            x={node.position[0]}
            y={node.position[1]}
            scale={1}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : node.type === "printer" ? (
          <Printer
            x={node.position[0]}
            y={node.position[1]}
            scale={0.7}
            role={node.role}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handlePrinterClick(node);
            }}
          />
        ) : node.type === "tv" ? (
          <TV
            x={node.position[0]}
            y={node.position[1]}
            scale={0.7}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : node.type === "mobile" ? (
          <Mobile
            x={node.position[0]}
            y={node.position[1]}
            scale={0.7}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : node.type === "cloud" ? (
          <Cloud
            x={node.position[0]}
            y={node.position[1]}
            scale={3}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : (
          <Computer
            x={node.position[0]}
            y={node.position[1]}
            role={node.role}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Computer
              handleComputerClick(node);
            }}
          />
        )}



        {/* Node ID label */}
        <Tooltip x={node.position[0] + 10} y={node.position[1] - 25} text={`id=${node.id}`} >
          <text x={node.position[0] + 30} y={node.position[1] - 25} fill="white" fontSize="12" fontWeight="bold">
          {node.id}
          </text>
        </Tooltip>
        </g>
      ))}
       
      {/* Define a gradient style for the circles */}
      <defs>
          <linearGradient id="halfRedHalfGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="49.9%" stop-color={sourceColor()} />
              <stop offset="50%"   stop-color={targetColor()} />
          </linearGradient>
      </defs>

      {/* Draw circles for each position */}
      {positions().map(pos => (
        <circle
          id={`circle-${pos.id}`} // Ensure each circle has a unique ID
          cx={pos.pos.x}
          cy={pos.pos.y}
          r="8"
          fill="url(#halfRedHalfGreen)" // Apply the sharp gradient
        />
      ))}
          <TooltipSVG /> Always on top
    </svg>

    {/* Display the SwitchPref component when a Switch is selected */}
    {clickedSwitch() && showSwitchPref() &&(
      <SwitchPref selectedSwitch={clickedSwitch()}
        allowedPorts={allowedPorts}
        setAllowedPorts={setAllowedPorts}
        onClose ={() => setShowSwitchPref(false)} />
    )}
    {/* Display the ComputerPref component when a computer is selected */}
    {clickedComputer() && showComputerPref() &&(
      <ComputerPref 
        selectedComputer={clickedComputer()} 
        onClose={() => setShowComputerPref(false)}/>
    )}
    {/* Display the SelectPrinterDialog component when a printer is selected */}
    {clickedComputer() && showPrinterSelect() && (
      <SelectPrinterDialog
        selectedComputer={clickedComputer()}
        availablePrinters={availablePrinters()}
        selectedPrinter={selectedPrinter}
        setSelectedPrinter={setSelectedPrinter}
        onConfirm={(printerId) => {
          console.log("Selected printer ID:", printerId);
          setShowPrinterSelect(false);
        }}
        onClose={() => setShowPrinterSelect(false)}
      />
    )}
    {/* Display the PrinterPref component when a printer is selected  */}
    {clickedPrinter() && (
      <PrinterPref
        selectedPrinter={clickedPrinter()}
        onSave={handlePrinterIpChange}
        onClose={() => setClickedPrinter(null)}
      />
    )}
    {/* Pop-up menu for computer options */}
    {clickedComputer() && showPopUp() &&(
      <ComputerPopUp
        selectedComputer={clickedComputer()}
        onClose={() => setShowPopUp(false)}
        onPing={() => {
          console.log("Ping:", clickedComputer().id);
          thread[0] = clickedComputer().id;
          // filter out selectedComputer().id from allowPorts to get targets
          let targets = allowedPorts().filter(id => id !== clickedComputer().id);
          thread[thread.length - 1] = targets;
          console.log("thread:", thread);
          // update forwarding table entry for all ids in targets with mac and port
          targets.forEach(id => {
            let entry = forwardingTable.find(entry => entry.destinationMac === getNodeById(id).mac);
            if (entry) {
              console.log("entry found:", entry);
            } else {
              console.log("entry not found:", id);
              // entry
              setForwardingTable(prev => [
                ...prev,
                { destinationMac: getNodeById(id).mac, port: `to ${id}` }
              ]);
            }
          });

          setSourceColor(clickedComputer().color); // Update source color based on node ID
          setTargetColor("gray"); // Update target color to green
          redoAnimation();
          }}
        onPrinterSelect={handlePrinterSelect}
        onPrintTestPage={handlePrintTestPage}
        onPreferences={handleComputerPreferences}
      />
    )}
    {/* Notification for printing test page */}
    {showNotification() && (
      <NotifyPrintTestPage
        selectedComputer={clickedComputer()}
        title="Print a test page"
        message={message}
        onClose={() => setShowNotification(false)}
      />
    )}
    {/* Notification for selecting printer */}

    </div>
  );
}

export default App;
