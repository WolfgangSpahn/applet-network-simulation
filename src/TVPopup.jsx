import { on } from "solid-js";

const TVPopup = ({ selectedDevice, onClose, onPing, scaleX, scaleY }) => {
    return (
      console.log("Selected computer:",selectedDevice),
      <div
        class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"
        style={{ top: `${selectedDevice.position[1]*scaleY}px`, left: `${selectedDevice.position[0]*scaleX}px` }}
        onClick={(e) => e.stopPropagation()}
      >

        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            console.log("DevicePopup clicked");
            onPing(selectedDevice);
            onClose();
          }}>Ping
        </button>
      </div>
    );
  };

  export default TVPopup;