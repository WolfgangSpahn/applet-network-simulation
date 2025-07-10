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
import TVPopup from "./TVPopup.jsx";
import MobilePopup from "./MobilePopup.jsx";
import ComputerPopUp from "./ComputerPopUp"; 
import PrinterPref from "./PrinterPref";
import NotifyPrintTestPage from "./NotifyPrintTestPage";
import NotifyOnEmilieInfo from "./NotifyOnEmilieInfo";
import SelectPrinterDialog from "./SelectPrinterDialog";
import Tooltip from "./Tooltip";
import TooltipSVG from "./TooltipSVG";
import { forwardingTable, setForwardingTable } from "./FWDTableStore";
import { _ , state } from "./multilang";
// import data
import { nodes_data, edges, getNode } from "./data.js";



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

// get host id (last int) from ip string
function getHostId(ip) {
    if (typeof ip !== 'string') {
      console.error("Invalid input: IP must be a string.");
      return null;
    }
  
    const parts = ip.trim().split('.');
    if (parts.length !== 4) {
      console.error("Invalid IP format: Must contain four octets.");
      return null;
    }
  
    const hostId = parseInt(parts[3], 10);
    if (isNaN(hostId)) {
      console.error("Invalid host ID: Last segment is not a number.");
      return null;
    }
  
    return hostId;
  }

let pathRefs = []; // Store path references globally


// --------------------------------------------------------------------------------------------------------
export const NetworkSimulator = (props) => {
  console.log("NetworkSimulator props:", props.width, props.height);

  const [width, setWidth] = createSignal(props.width || 500);
  const [height, setHeight] = createSignal(props.height || 500);
  const [scaleX, setScaleX] = createSignal(props.width/500);
  const [scaleY, setScaleY] = createSignal(props.height/500);
  const [scale, setScale] = createSignal(props.height/500);

  const [logBook, setLogBook] = createSignal("Log:"); // Track logbook entries
  //const [positions, setPositions] = createSignal([{ id: thread[0], pos: getNodeById(thread[0]).position }]);
  const [targetColor, setTargetColor] = createSignal("white"); // Track target color
  const [sourceColor, setSourceColor] = createSignal("blue"); // Track source color
  const [discoveredPrinter, setDiscoveredPrinter] = createSignal(false); // Track broadcast state
  const [clickedSwitch, setClickedSwitch] = createSignal(null); // Track selected Switch
  const [clickedComputer, setClickedComputer] = createSignal(null); // Track selected computer
  const [clickedTV, setClickedTV] = createSignal(null); // Track selected TV
  const [clickedMobile, setClickedMobile] = createSignal(null); // Track selected mobile
  const [showSwitchPref, setShowSwitchPref] = createSignal(false); // Track SwitchPref visibility
  const [showComputerPref, setShowComputerPref] = createSignal(false); // Track Computer
  const [showTVPopup, setShowTVPopup] = createSignal(false); // Track TVPopup visibility
  const [showMobilePopup, setShowMobilePopup] = createSignal(false); // Track MobilePopup visibility
  const [showPopUp, setShowPopUp] = createSignal(false); // Track PopUp visibility

  
  const [clickedPrinter, setClickedPrinter] = createSignal(null); // Track selected printer

  const [showPrinterPref, setShowPrinterPref] = createSignal(false); // Track PrinterPref visibility
  const [showNotification, setShowNotification] = createSignal(false); // Track notification visibility
  const [showEmilieNotification, setShowEmilieNotification] = createSignal(false); // Track Emilie notification visibility
  const [message, setMessage] = createSignal(""); // Track notification message
  const [success, setSuccess] = createSignal(false); // Track success state
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

    // Handle submit button click
    const handleSubmit = (event) => {
      // execute the submit logic here: props.onSubmit()
      // let submitText = `Material: ${_(material())}, θ_i: ${incomingAngle().toFixed(0)}°, θ_t: ${transmittedAngle().toFixed(0)}°`;
      let submitText = logBook();
      // if props.onSubmit is a function, call it

      props.onSubmit({
                          preventDefault: () => {},
                          target: { value: submitText }
                      });

      setLogBook("");
    };

  const handleDeviceClick = (node) => {
    console.log(`Device ${node.id} clicked! Initiate multicast ping.`);
    // add a logbook entry
    setLogBook(prev => `${prev}[Device ${node.type} ${node.id} clicked!  Initiate multicast ping.]`);
    // deep copy unicastThread
    thread = JSON.parse(JSON.stringify(unicastThread));
    thread[0] = node.id;
    // get last nodes id in thread
    // let lastNodeIds = thread[thread.length - 1];
    // console.log("lastNodeIds:", lastNodeIds);
    // // lasst node can be a number: if number convert it to array
    // lastNodeIds = Array.isArray(lastNodeIds) ? lastNodeIds : [lastNodeIds];
    // // get the last nodes
    // let lastNodes = lastNodeIds.map(id => getNodeById(id));
    // console.log("lastNodes:", lastNodes);


    // --- added to show multicast behaviour
    // filter out selectedComputer().id from allowPorts to get targets
    let targets = allowedPorts().filter(id => id !== node.id);
    thread[thread.length - 1] = targets;
    console.log("thread:", thread);
    // ---  
    
    let targetNodes = thread[thread.length - 1].map(id => getNodeById(id));
    console.log("targetNodes:", targetNodes);
    // Update forwarding table entries for the last nodes
    updateForwardingTable(node,targetNodes,setLogBook);
   
    
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
    setLogBook(prev => `${prev}[Printer ${node.id} clicked!]`);
    // setShowPrinterPref(true);
    setClickedPrinter(node); // Set the clicked printer ID
  };

  const handleTVClick = (node) => {
    console.log(`=> TV ${node.id} clicked!`);
    setLogBook(prev => `${prev}[TV ${node.id} clicked!]`);
    setShowTVPopup(true);
    setClickedTV(node); // Set the clicked TV ID
  };

  const handleMobileClick = (node) => {
    console.log(`Mobile ${node.id} clicked!`);
    setLogBook(prev => `${prev}[Mobile ${node.id} clicked!]`);
    setShowMobilePopup(true);
    setClickedMobile(node); // Set the clicked Mobile ID
  };

  const handleSwitchClick = (node) => {
    setLogBook(prev => `${prev}[Switch ${node.id} clicked!]`);
    setShowSwitchPref(true);
    setClickedSwitch(node); // Set the clicked Switch ID
  };

  const handleComputerClick = (node) => {
    setLogBook(prev => `${prev}[Computer ${node.id} clicked!]`);
    setShowPopUp(true);
    setClickedComputer(node); // Set the clicked computer ID

  };

  const handleComputerPreferences = (node) => {
    console.log(`Computer ${node.id} preferences clicked!`);
    setLogBook(prev => `${prev}[Computer ${node.id} preferences clicked!]`);
    console.debug(`Preferences for Computer ${node.id}`);
    setShowComputerPref(true);
    setClickedComputer(node);
  }

  const handlePrinterSelect = (node) => {
    setShowPrinterSelect(true);
  };

  const handlePrinterIpChange = (id, data) => {
    console.log("Printer IP changed:", id, data);
    setLogBook(prev => `${prev}[Printer ${id} IP changed to ${data.ip}]`);
    // change node ip with id
    setNodes((node) => node.id === id, "ip", data.ip );
    setShowEmilieNotification(true);
  }

  const handlePrintTestPage = (computer) => {
    let printer = nodes.find(n => n.type === "printer");
    console.log("handlePrintTestPage: nodes:",nodes);
    console.log("handlePrintTestPage: available:",availablePrinters());
    console.log("handlePrintTestPage: computer:",computer);
    console.log("handlePrintTestPage: printer:",printer);  
    // check of print is available in availablePrinters
    if (availablePrinters().some(p => p.id === printer.id) && (selectedPrinter() === printer.id)) {
      console.log("handlePrintTestPage: Printer available");
      // check if printer ip is in the subnet of the computer
      if (printer && printer.ip.startsWith(computer.subnet) && getHostId(printer.ip)==13) {
        // alert(`Print test page to ${printer.name}`);
        setMessage(`Print test page to ${printer.name}`);
        setLogBook(prev => `${prev}[Print test page to ${printer.name}]`);
        setShowNotification(true);
        setSuccess(true);
        props.onSubmit({
          preventDefault: () => {},
          target: { value: "Success!! Test page is printed!!!" }
        });
      } else {
        // alert(`Could not print test page to ${printer.name}`);
        setMessage(`Could not print test page to ${printer.name}`);
        setLogBook(prev => `${prev}[Could not print test page to ${printer.name}]`);
        setShowNotification(true);
        setSuccess(false);
      }
    } else {
      // alert(`Printer not available`);
      console.log("handlePrintTestPage: Printer not available");
      setMessage(`Printer not available`);
      setLogBook(prev => `${prev}[Printer not available]`);
      setShowNotification(true);
    }
  }


  // Use createEffect to log the updated value

  createEffect(() => {
    console.log("broadcast has changed:", discoveredPrinter());
    // if 13 is in allowedPorts
    let printer = nodes.find(n => n.type === "printer");
    let computer = nodes.find(n => n.type === "computer");
    // if port 13 and 4 are allowed port and printer IP is in computer subnet and printer IP ends on printer id
    if (allowedPorts().includes(13)
        && (allowedPorts().includes(4))
        && (printer.ip == `${computer.subnet}.${printer.id}`)) {    
      // if discoveredPrinter is true, set availablePrinters to [{ id: 1, name: "HPP 1000" }]
      setAvailablePrinters([{ id: 13, name: "HPP 1000" }]);
      setLogBook(prev => `${prev}[Computer and Printer can communicate. Printer is available.]`);
      // -------------------- fix --------------------
      props.onSubmit({
        preventDefault: () => {},
        target: { value: "C-P" }
      });
      // ---------------------------------------------
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
    const steps = 50;

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

  const addSubmitButton = (svgWidth, svgHeight) => {
    const buttonWidth = 100;
    const buttonHeight = 30;
    const buttonX = 20; // Offset from the left
    const buttonY = svgHeight - buttonHeight - 20; // Offset from the bottom
    const infoX = buttonX + buttonWidth + 10; // Offset text from the button

    return (
      <g
        cursor="pointer"
        onClick={handleSubmit} // Replace with desired functionality
      >
        {/* Button Background */}
        <rect
          x={buttonX}
          y={buttonY}
          width={buttonWidth}
          height={buttonHeight}
          fill="#4caf50" // Green button background
          rx="5" // Rounded corners
          ry="5"
        />
        {/* Button Label */}
        <text
          x={buttonX + buttonWidth / 2}
          y={buttonY + buttonHeight / 2 + 5} // Adjust for text alignment
          fill="white"
          font-size="14"
          font-family="Arial, sans-serif"
          text-anchor="middle"
        >
          {_("submit")}
        </text>
      </g>
    );
  };

  return (
    <div class="bg-gray-900 relative border text-sm" onClick={handleOutsideClick}> 
    <svg width={props.width} height={props.height}>
      {edges.map((edge, index) => {
        const startNode = getNodeById(edge.nodes[0]);
        const endNode = getNodeById(edge.nodes[1]);

        return (
          <path
            ref={(el) => (pathRefs[index] = el)}
            d={`M ${startNode.position[0]*scaleX()} ${startNode.position[1]*scaleY()} L ${endNode.position[0]*scaleX()} ${endNode.position[1]*scaleY()}`}
            stroke="white"
            fill="none"
            stroke-width={edge.type === "internal"? "8" : "1"}
            stroke-dasharray={edge.type === "wireless"? "5,5" : "0"}
          />
        );
      })}
      {/* draw text to top left of the viewport */}
      <text x={10} y={30} fill="white" fontSize="16" fontWeight="bold">
        {/* Version 0.9 */}
        <tspan style="font-size: 18px; font-weight: bold;">Subnet Address: {"192.168.1"}</tspan>
      </text>
      {nodes.map((node) => (
        <g>
            {/* Draw either Switch or Computer based on node type */}
            {node.type === "Switch" ? (
          <Switch
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={scale()}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Switch
              handleSwitchClick(node);
            }}
          />
        ) : node.type === "router" ? (
          <Router
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={scale()}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : node.type === "printer" ? (
          <Printer
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={0.7*scale()}
            role={node.role}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handlePrinterClick(node);
            }}
          />
        ) : node.type === "tv" ? (
          <TV
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={0.7*scale()}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleTVClick(node);
            }}
          />
        ) : node.type === "mobile" ? (
          <Mobile
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={0.7*scale()}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleMobileClick(node);
            }}
          />
        ) : node.type === "cloud" ? (
          <Cloud
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            scale={3*scale()}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Router
              handleDeviceClick(node);
            }}
          />
        ) : (
          <Computer
            x={node.position[0]*scaleX()}
            y={node.position[1]*scaleY()}
            role={node.role}
            color={node.color}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking on Computer
              handleComputerClick(node);
            }}
          />
        )}

        {addSubmitButton(width(), height())}

        {/* Node ID label */}
        <Tooltip x={node.position[0]*scaleX() + 10} y={node.position[1]*scaleY() - 25} text={`id=${node.id}`} >
          <text x={node.position[0]*scaleX() + 30} y={node.position[1]*scaleY() - 25} fill="white" fontSize="12" fontWeight="bold">
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
          cx={pos.pos.x*scaleX()}
          cy={pos.pos.y*scaleY()}
          r="8"
          fill="url(#halfRedHalfGreen)" // Apply the sharp gradient
        />
      ))}
      
      <TooltipSVG /> 
    </svg>

    {/* ================================ Popups  ======================================= */}

    {/* Display the SwitchPref component when a Switch is selected */}
    {clickedSwitch() && showSwitchPref() &&(
      <SwitchPref selectedSwitch={clickedSwitch()}
        allowedPorts={allowedPorts}
        setAllowedPorts={setAllowedPorts}
        setShowEmilieNotification={setShowEmilieNotification}
        onClose ={() => setShowSwitchPref(false)}
        scaleX={scaleX()}
        scaleY={scaleY()}
        />
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
          setLogBook(prev => `${prev}[Printer ${printerId} selected]`);
        }}
        onClose={() => setShowPrinterSelect(false)}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
    {/* Display the PrinterPref component when a printer is selected  */}
    {clickedPrinter() && (
      <PrinterPref
        selectedPrinter={clickedPrinter()}
        onSave={handlePrinterIpChange}
        onClose={() => setClickedPrinter(null)}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
    {clickedTV() && showTVPopup() && (
      <TVPopup
        selectedDevice={clickedTV()}
        onClose={() => setShowTVPopup(false)}
        onPing={(node) => {
          // Reuse handleDeviceClick for consistent behavior
          handleDeviceClick(node);
        }}
        scaleX={scaleX()}
        scaleY={scaleY()}
      /> 
    )}

    {clickedMobile() && showMobilePopup() && (
      <TVPopup
        selectedDevice={clickedMobile()}
        onClose={() => setShowMobilePopup(false)}
        onPing={(node) => {
          // Reuse handleDeviceClick for consistent behavior
          handleDeviceClick(node);
        }}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
      
    {/* Pop-up menu for computer options */}
    {clickedComputer() && showPopUp() &&(
      <ComputerPopUp
        selectedComputer={clickedComputer()}
        onClose={() => setShowPopUp(false)}
        onPing={() => {
          // Reuse handleDeviceClick for consistent behavior
          handleDeviceClick(clickedComputer());
        }}
        onPrinterSelect={handlePrinterSelect}
        onPrintTestPage={handlePrintTestPage}
        onPreferences={handleComputerPreferences}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
    {/* Notification for printing test page */}
    {showNotification() && (
      <NotifyPrintTestPage
        selectedComputer={clickedComputer()}
        title="Print a test page"
        message={message}
        success={success}
        onClose={() => setShowNotification(false)}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
    {/* Notification for Emilie Info */}
    {showEmilieNotification() && (
      <NotifyOnEmilieInfo
        selectedComputer={clickedPrinter()}
        title="Alert"
        message={"Please inform Emilie!"}
        onClose={() => setShowEmilieNotification(false)}
        scaleX={scaleX()}
        scaleY={scaleY()}
      />
    )}
    {/* Logbook */}

    </div>

  );
}


const updateForwardingTable = ( srcNode, targetNodes, setLogBook) => {
  // nodes hold the destination nodes which give the ports
  // srcNode holds the source node which is used to update the forwarding table
  console.log("Updating forwarding table for source node:", srcNode);
  console.log("Target nodes number:", targetNodes.length);
  let intermediate_table = [{ destinationMac: srcNode.mac, port: srcNode.id }];
  // add target nodes to the intermediate table, for printer check if IP is subnet of source node . printer id

  targetNodes.forEach(target => {
      intermediate_table.push({ destinationMac: target.mac, port: target.id, ip: target.ip? target.ip : undefined});
  });

  // allow undefined ip in the intermediate table and ip === "192.168.1.13" TODO: Needs to be changed to a more generic solution
  intermediate_table = intermediate_table.filter(entry => entry.ip === undefined || entry.ip === "192.168.1.13");

  console.log("Intermediate forwarding table:", intermediate_table);

  //update the forwarding table, by entries in intermediate_table which are not already in the forwarding table
  intermediate_table.forEach(entry => {
    const existingEntry = forwardingTable.find(fwd => fwd.destinationMac === entry.destinationMac);
    if (existingEntry) {
      // nothing to do, entry already exists
    } else {
      // Add new entry
      setForwardingTable([...forwardingTable, entry]);
    }
  });
};

export default NetworkSimulator;
