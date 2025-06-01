import NetworkSimulator from './src/NetworkSimulator'


function App() {
  return (
      <div class="flex items-center justify-center min-h-screen bg-gray-800">
        <div class="bg-gray-800 p-4 ">
          <h1 class="text-2xl font-bold text-gray-100 m-4">Network Simulator Test</h1>
          <NetworkSimulator width="400" height="400" />
        </div>
      </div>
  );
}

export default App;
