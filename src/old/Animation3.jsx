import { createSignal } from "solid-js";
import BridgePref from "../BridgePref"; // Import BridgePref component

const App = () => {
  const [selectedBridge, setSelectedBridge] = createSignal(null); // Track selected bridge

  const handleBridgeClick = (id) => {
    setSelectedBridge(id); // Set the clicked bridge ID
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".bridge-pref")) {
      setSelectedBridge(null); // Close BridgePref when clicking outside
    }
  };

  return (
    <div class="relative" onClick={handleOutsideClick}>
      <svg width="500" height="500">
        {edges.map((edge, index) => {
          const startNode = getNodeById(edge.nodes[0]);
          const endNode = getNodeById(edge.nodes[1]);

          return (
            <path
              key={index}
              d={`M ${startNode.position[0]} ${startNode.position[1]} L ${endNode.position[0]} ${endNode.position[1]}`}
              stroke="white"
              fill="none"
              stroke-width="1"
              stroke-dasharray="5,5"
            />
          );
        })}

        {nodes.map((node) => (
          <g>
            {node.type === "transition" ? (
              <Bridge
                x={node.position[0]}
                y={node.position[1]}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing when clicking on Bridge
                  handleBridgeClick(node.id);
                }}
              />
            ) : (
              <Computer
                x={node.position[0]}
                y={node.position[1]}
                type={node.type}
                onClick={node.type === "source" ? redoAnimation : undefined}
              />
            )}
            {/* Node ID label */}
            <text
              x={node.position[0] + 25}
              y={node.position[1] - 10}
              fill="black"
              fontSize="12"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Display the BridgePref component when a bridge is selected */}
      {selectedBridge() && (
        <BridgePref
          selectedBridge={selectedBridge()}
          onClose={() => setSelectedBridge(null)}
        />
      )}
    </div>
  );
};

export default App;
