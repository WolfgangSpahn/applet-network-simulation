import { on } from "solid-js";

const PrinterPopup = ({ selectedPrinter, onClose, onPing, onPreferences,scaleX,scaleY}) => {
    return (
      console.log(selectedPrinter),
      <div
        class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"
        style={{ top: `${selectedPrinter.position[1]*scaleY}px`, left: `${selectedPrinter.position[0]*scaleX}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPreferences(selectedPrinter);
            onClose();
          }}
        >
          Preferences
        </button>
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPing(selectedPrinter);
            onClose();
          }}
        >
          Print Test Page
        </button>
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPing(selectedPrinter);
            onClose();
          }}
        >
          Ping
        </button>
      </div>
    );
  };

  export default PrinterPopup;