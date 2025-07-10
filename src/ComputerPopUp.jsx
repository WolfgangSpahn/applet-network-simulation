import { on } from "solid-js";

const ComputerPopup = ({ selectedComputer, onClose, onPing, onPrinterSelect, onPrintTestPage, onPreferences,scaleX,scaleY }) => {
    return (
      console.log(selectedComputer),
      <div
        class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"
        style={{ top: `${selectedComputer.position[1]*scaleY}px`, left: `${selectedComputer.position[0]*scaleX}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPreferences(selectedComputer);
            onClose();
          }}
        >
          Preferences
        </button>
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPing(selectedComputer);
            onClose();
          }}>Ping
        </button>

        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPing(selectedComputer);
            onPrinterSelect(selectedComputer);
            onClose();
          }}
        >
          Select Printer
        </button>
        {/* print test page */}
        <button
          class="block w-full text-left px-2 py-1 hover:bg-gray-700"
          onClick={() => {
            onPrintTestPage(selectedComputer);
            onClose();
          }}
        >
          Print Test Page
        </button>
      </div>
    );
  };

  export default ComputerPopup;