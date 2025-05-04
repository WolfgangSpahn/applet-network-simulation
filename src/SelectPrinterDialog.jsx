import { createSignal } from "solid-js";

const SelectPrinterDialog = ({selectedComputer, availablePrinters, selectedPrinter, setSelectedPrinter, onConfirm, onClose }) => {
  

  return (
    <div
      class="select-printer-dialog absolute top-40 left-0 m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg"
      style={{ top: `${selectedComputer.position[1]-300}px`, left: `${selectedComputer.position[0]-100}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 class="text-lg font-bold mb-4">Select a Printer</h2>
      <div class="flex flex-col space-y-4">
        {/* if availablePrinters is empty */}
        {availablePrinters.length === 0 && (
          <div class="text-gray-300">
            No printers available.
          </div>
        )}
        {/* if availablePrinters is not empty */}
        {availablePrinters.map((printer) => (
            <label
                class={`flex items-center justify-between p-3 mb-2 rounded cursor-pointer border 
                ${selectedPrinter() === printer.id ? "bg-blue-700 border-blue-500" : "bg-gray-800 border-gray-600"}`}
            >
                <div class="flex items-center space-x-3">
                <input
                    type="radio"
                    name="printer"
                    value={printer.id}
                    checked={selectedPrinter() === printer.id}
                    onChange={() => setSelectedPrinter(printer.id)}
                    class="accent-blue-500"
                />
                <span class="text-white">{printer.name}</span>
                </div>
            </label>
            ))}
      </div>
      <div class="flex justify-end space-x-4 mt-6">
        <button
          class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        {availablePrinters.length !== 0 && (
            <button
            class="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            disabled={!selectedPrinter()}
            onClick={() => {
                if (selectedPrinter()) {
                onConfirm(selectedPrinter());
                }
            }}
            >
            Confirm
            </button>
        )}
      </div>
    </div>
  );
};

export default SelectPrinterDialog;