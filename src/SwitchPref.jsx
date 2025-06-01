import { createSignal, createEffect, For, onCleanup, on } from "solid-js";

import { forwardingTable, setForwardingTable } from "./FWDTableStore";
import { nodes_data } from "./data";

const SwitchPref = ({ selectedSwitch, allowedPorts, setAllowedPorts, setShowEmilieNotification, onClose }) => {
  const [switchType, setSwitchType] = createSignal(selectedSwitch?.forwarding || "clientIsolation");
  const [name, setName] = createSignal(selectedSwitch?.name || "no switch selected");
  const [error, setError] = createSignal("");


  const validateInputs = () => {
    if (!name()) {
      setError("Name is required.");
      return;
    }
    setError("");
  };

  const validateMACInput = (index, value) => {
    if (value && !/^([0-9A-Fa-f]{2}:){0,5}[0-9A-Fa-f]{0,2}$/.test(value)) {
      setError(`Invalid MAC format at row ${index + 1}.`);
      return;
    }
    setError("");
  };

  const validateMACCompleteness = (index, value) => {
    if (value && !/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(value)) {
      setError(`Incomplete MAC address at row ${index + 1}.`);
      return;
    }
    setError("");
  };

  const validatePortInput = (index, value) => {
    if (value && !/^[1-8]?$/.test(value)) {
      setError(`Invalid Port at row ${index + 1}. Must be between 1 and 8.`);
      return;
    }
    setError("");
  };

  const updateForwardingTable = (index, field, value) => {

    // setForwardingTable(index, field, value);
    // if (field === "destinationMac") validateMACInput(index, value);
    // if (field === "port") validatePortInput(index, value);
  };

  createEffect(() => {
    console.log(`Allowed ports:`, allowedPorts());
  });

  return (
    <div  class="switch-pref absolute top-0 right-0 m-4 bg-gray-900 text-white text-xs p-4 rounded shadow-lg"
          onClick={(e) => e.stopPropagation()}
          >
      <h2 class="text-white mb-2">Switch Settings (ID: {selectedSwitch.name})</h2>
      <div class="bg-gray-800 rounded-lg p-6">
        <div class="flex flex-col space-y-6">
          <div class="flex flex-col">
            <span class="mb-2">Name:</span>
            <input
              type="text"
              class="bg-gray-700 text-white p-2 rounded w-full"
              value={name()}
              onInput={(e) => {
                setName(e.target.value);
                validateInputs();
              }}
              title="Enter the name of the switch"
            />
          </div>

          {/* Allowed Ports */}
          <div class="flex flex-col">
            <span class="mb-2">Allowed Ports:</span>
            <div class="grid grid-cols-4 gap-4">
              <For each={nodes_data.filter((_, index) => index !== 0 && index !== 1).map(node => node.id)}>
                {(id) => (
                <label class="flex items-center space-x-2">
                  <input
                  type="checkbox" // Changed from "radio" to "checkbox"
                  name="allowedPorts"
                  value={id} // Use the raw id as the value
                  checked={allowedPorts().includes(id)} // Check if the ID is in the allowedPorts array
                  class="form-checkbox text-blue-500"
                  onChange={(e) => {
                    console.log(`Toggled port: ${id}`);
                    // Add or remove the port from allowedPorts based on the checkbox state
                    setAllowedPorts((prev) => {
                      if (e.target.checked) {
                        if (!prev.includes(id)) {
                          return [...prev, id];
                        }
                      } else {
                        return prev.filter((port) => port !== id);
                      }

                      return prev;
                    });
                  }}
                  />
                  <span>{`to ${id}`}</span>
                </label>
                )}
              </For>
            </div>
          </div>
    
          {/* Forwarding Table */}
          <div class="flex flex-col">
                <span class="mb-2">Forwarding Table:</span>
                <div class="grid grid-cols-2 gap-2">
                  <For each={forwardingTable}>
                  {(entry, index) => (
                    <div class="flex space-x-2">
                    <input
                      type="text"
                      class="bg-gray-700 text-white p-2 rounded w-full"
                      value={entry.showMobilePopup}
                      onInput={(e) =>
                      updateForwardingTable(index(), "destinationMac", e.target.value)
                      }
                      onBlur={(e) =>
                      validateMACCompleteness(index(), e.target.value)
                      }
                      placeholder="Destination MAC"
                      title="Enter the destination MAC address"
                    />
                    <input
                      type="text"
                      class="bg-gray-700 text-white p-2 rounded w-16"
                      value={entry.port}
                      onInput={(e) =>
                        updateForwardingTable(index(), "port", e.target.value)
                      }
                      placeholder="Port"
                      title="Enter the outgoing port number (1-8)"
                    />
                  </div>
                )}
              </For>
            </div>
          </div>

          {name() && !error() && (
            <button
              class="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              onClick={() => {
                console.log("Save computer preferences");
                setShowEmilieNotification(true);
                onClose();
              }}
            >
              Save
            </button>
          )}

          {error() && <div class="text-red-500 mt-4">{error()}</div>}
        </div>
      </div>
    </div>
  );
};

export default SwitchPref;
