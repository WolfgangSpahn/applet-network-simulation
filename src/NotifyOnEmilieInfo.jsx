import { createSignal } from "solid-js";

const NotifyOnEmilieInfo = ({ selectedComputer, title, message, onClose }) => {

  return (
    <div  class="computer-pref p-4 absolute bg-gray-800 rounded text-white"
          style={{ top: `${200}px`, left: `${200}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 class="text-lg font-bold mb-4">{title}</h2>
      <div class="flex flex-col space-y-4">
        <div class="text-bg-300">
          {message()}
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button
            class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded cursor-pointer"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyOnEmilieInfo;