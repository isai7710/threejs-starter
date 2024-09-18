import "./App.css";
import ThreeJSScene from "./components/three-js-scene";

function App() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ThreeJSScene />
        <p>First Three.js Scene</p>
      </div>
    </>
  );
}

export default App;
