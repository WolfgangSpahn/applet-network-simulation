import { createSignal, onMount, createEffect } from "solid-js";

const PrinterPref = ({ selectedPrinter,  onSave, onClose,scaleX,scaleY }) => {
  const [name, setName] = createSignal(selectedPrinter?.name || "no printer selected");
  const [ipAddress, setIpAddress] = createSignal(selectedPrinter?.ip || "");
  const [macAddress, setMacAddress] = createSignal(selectedPrinter?.mac || "");
  const [error, setError] = createSignal("");

  // Function to update store for a given node ID
  const updateStore = () => {
    const nodeId = selectedPrinter.id;
    if (!nodeId) return; // Prevent updating when no node is selected
  };

  // Effect: Whenever signals change, update the store automatically
  createEffect(() => {
    updateStore();
  });

  const validateInputs = () => {
    if (!name()) {
      setError("Name is required.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipAddress())) {
      setError("Invalid IP-Address format.");
      return;
    }
    setError("");
  };

  onMount(() => {
    console.log("PrinterPref component mounted");
  });

  return (
    <div
      class="printer-pref absolute top-10 left-0 m-4 bg-gray-900 text-white"
      style={{ top: `${selectedPrinter.position[1]*scaleY}px`, left: `${(selectedPrinter.position[0] - 100)*scaleX}px` }}
      onClick={(e) => e.stopPropagation()}
    >
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
              title="Enter the name of the printer"
            />
          </div>

          <div class="flex flex-col">
            <span class="mb-2">MAC-Address:</span>
            <input
              type="text"
              class="bg-gray-700 text-white p-2 rounded w-full"
              value={macAddress()}
              onInput={(e) => {
                setMacAddress(e.target.value);
                validateInputs();
              }}
              placeholder="fe:08:d8:75:82:a0"
              title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"
            />
          </div>

          <div class="flex flex-col">
            <span class="mb-2">IP-Address:</span>
            <input
              type="text"
              class="bg-gray-700 text-white p-2 rounded w-full"
              value={ipAddress()}
              onInput={(e) => {
                setIpAddress(e.target.value);
                validateInputs();
              }}
              placeholder="192.168.0.1"
              title="Enter the IP address of the printer"
            />
          </div>

          {name() && ipAddress() && !error() && (
            <button
              class="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              onClick={() => {
                console.log("Save printer preferences");
                onSave(selectedPrinter.id, { name: name(), ip: ipAddress() });
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

export default PrinterPref;