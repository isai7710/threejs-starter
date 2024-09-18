import "./App.css";
import ThreeJSCube from "./components/three-js-cube";

function App() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ThreeJSCube />
        <p>First Three.js Scene</p>
      </div>
    </>
  );
}

export default App;
