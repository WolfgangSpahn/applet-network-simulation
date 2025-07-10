import { createSignal, createEffect, For, onCleanup, on } from "solid-js";

import { forwardingTable, setForwardingTable } from "./FWDTableStore";
import { nodes_data } from "./data";

const SwitchPref = ({ selectedSwitch, allowedPorts, setAllowedPorts, setShowEmilieNotification, onClose, scaleX, scaleY }) => {
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

    setForwardingTable(index, field, value);
    if (field === "destinationMac") validateMACInput(index, value);
    if (field === "port") validatePortInput(index, value);
    return value;
  };

  createEffect(() => {
    console.log(`Allowed ports:`, allowedPorts());
  });

  return (
    <div  
      class="switch-pref absolute top-0 right-0 m-4 bg-gray-900 text-white text-fluid-xs p-4 rounded shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 class="text-white text-fluid-lg font-medium mx-2 mb-1">Switch Settings</h2>
      <div class="bg-gray-800 rounded-lg p-6">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Name:</span>
            <input
              type="text"
              class="bg-gray-700 text-white text-fluid-xs p-2 rounded w-full"
              value={name()}
              onInput={(e) => {
                setName(e.target.value);
                validateInputs();
              }}
              title="Enter the name of the switch"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Allowed Ports:</span>
            <div class="grid grid-cols-4 gap-2">
              <For each={nodes_data.filter((_, index) => index !== 0 && index !== 1).map(node => node.id)}>
                {(id) => (
                <label class="flex items-center space-x-2 text-fluid-xs">
                  <input
                    type="checkbox"
                    name="allowedPorts"
                    value={id}
                    checked={allowedPorts().includes(id)}
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
                      // Delete the entry from forwardingTable if the port is unchecked
                      setForwardingTable((prev) => prev.filter(entry => entry.port !== id));
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
            <span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Forwarding Table:</span>
            <div>
              {/* Column Headers */}
              <div class="grid grid-cols-4 gap-2 mb-1" style="grid-template-columns: 3fr 1fr 3fr 1fr;">
                <div class="text-fluid-2xs font-medium text-gray-300">Target MAC Adr.</div>
                <div class="text-fluid-2xs font-medium text-gray-300 text-center">Port to</div>
                <div class="text-fluid-2xs font-medium text-gray-300">Target MAC Adr.</div>
                <div class="text-fluid-2xs font-medium text-gray-300 text-center">Port to</div>
              </div>
              
              {/* Table Content */}
              <div class="grid grid-cols-4 gap-2" style="grid-template-columns: 3fr 1fr 3fr 1fr;">
                <For each={forwardingTable}>
                  {(entry, index) => (
                    <>
                      <div class={`bg-gray-700 text-white text-fluid-2xs p-1 rounded overflow-hidden ${index() % 2 === 1 ? 'col-start-3' : ''}`}>
                        {entry.destinationMac || "—"}
                      </div>
                      <div class={`bg-gray-700 text-white text-fluid-2xs p-1 rounded text-center ${index() % 2 === 1 ? 'col-start-4' : ''}`}>
                        {`${entry.port}` || "—"}
                      </div>
                    </>
                  )}
                </For>
                {forwardingTable.length === 0 && (
                  <div class="text-gray-400 text-fluid-xs italic col-span-4">No entries</div>
                )}
              </div>
            </div>
          </div>

          {name() && !error() && (
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-fluid-xs p-2 rounded"
              onClick={() => {
                console.log("Save computer preferences");
                setShowEmilieNotification(true);
                onClose();
              }}
            >
              Save
            </button>
          )}

          {error() && <div class="text-red-500 text-fluid-xs mt-4">{error()}</div>}
        </div>
      </div>
    </div>
  );
};

export default SwitchPref;
