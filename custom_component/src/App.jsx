import "./App.css";
import { useState } from "react";
import ThreeJSScene from "./components/three-js-scene";

function App() {
  const [color, setColor] = useState(true);
  const [bgColor, setBGColor] = useState(true);

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <ThreeJSScene color={color} bgColor={bgColor} />
        <p>First Three.js Scene</p>
        <div className="flex justify-between gap-2">
          <button onClick={() => setColor(!color)} className="w-1/2">
            Click to change object color to{" "}
            <span>{color ? `blue` : `red`}</span>
          </button>
          <button onClick={() => setBGColor(!bgColor)} className="w-1/2">
            Click to change background color to{" "}
            <span>{bgColor ? `dirty green` : `normal`}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
