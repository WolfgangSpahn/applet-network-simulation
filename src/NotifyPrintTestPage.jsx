import { createSignal } from "solid-js";

const NotifyPrintTestPage = ({ selectedComputer, title, message, success, onClose }) => {

  return (
    <div  class={`computer-pref absolute p-4 ${success() ? "bg-green-900" : "bg-red-900"} text-white rounded shadow-lg`}
          style={{ top: `${selectedComputer.position[1]-300}px`, left: `${selectedComputer.position[0]}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 class="text-lg font-bold mb-4">{title}</h2>
      <div class="flex flex-col space-y-4">
        <div class="text-bg-300">
          {message()}
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button
            class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyPrintTestPage;