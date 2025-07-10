import { createSignal, onMount, createEffect } from "solid-js";

const ComputerPref = ({ selectedComputer, onClose, scaleX,scaleY }) => {
  const [name, setName] = createSignal(selectedComputer?.name|| "");
  const [macAddress, setMacAddress] = createSignal(selectedComputer?.mac || "");
  const [subnet, setSubnet] = createSignal(selectedComputer?.subnet || "");
  const [id, setId] = createSignal(selectedComputer?.id || "");
  const [error, setError] = createSignal("");

  

  const validateInputs = () => {
    if (!name()) {
      setError("Name is required.");
      return;
    }
    if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(macAddress())) {
      setError("Invalid MAC-Address format.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(subnet())) {
      setError("Invalid Subnet format.");
      return;
    }
    if (!/^\d{1,3}$/.test(id())) {
      setError("Invalid ID format.");
      return;
    }
    setError("");
  };


  onMount(() => {
    console.log("ComputerPref component mounted");
  });

  return (
    <div  class="computer-pref absolute m-4 bg-gray-900 text-white"
          style={{ top: `${selectedComputer.position[1]-300}px`, left: `${selectedComputer.position[0]-100}px` }}
          // style={{ top: `0px`, left: `0px` }}
          onClick={(e) => e.stopPropagation()}>
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
              title="Enter the name of the computer"
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
            <div class="flex items-end space-x-2 w-full">
              <div class="flex flex-col flex-grow">
                <span class="text-sm mb-1">Subnet-Address</span>
                <input
                  type="text"
                  class="bg-gray-700 text-white p-2 rounded w-full"
                  value={subnet()}
                  onInput={(e) => {
                    setSubnet(e.target.value);
                    validateInputs();
                  }}
                  placeholder="XXX.XXX.XXX"
                  title="Enter the subnet portion of the IP address (Format: XXX.XXX.XXX)"
                />
              </div>
              <span class="pb-2">.</span>
              <div class="flex flex-col">
                <span class="text-sm mb-1">Id</span>
                <input
                  type="text"
                  class="bg-gray-700 text-white p-2 rounded w-12"
                  value={id()}
                  onInput={(e) => {
                    setId(e.target.value);
                    validateInputs();
                  }}
                  placeholder="XXX"
                  title="Enter the host ID portion of the IP address (Format: XXX)"
                />
              </div>
            </div>
          </div>
          {name() && macAddress() && subnet() && id() && !error() && (
            <button
              class="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              onClick={() => {
                console.log("Save computer preferences");
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

export default ComputerPref;
