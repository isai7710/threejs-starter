import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./components/model";
import { useState } from "react";
import RobotModel from "./components/robot";

const App = () => {
  const [showWireframe, toggleShowWireframe] = useState(true);
  const [showRobot, toggleShowRobot] = useState(true);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="w-[50vw] h-[70vh] rounded-lg border-2 border-green-800">
        <Canvas
          className="rounded-md bg-green-800 bg-opacity-10"
          gl={{ alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 10, 40]} />
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            enableZoom
            enablePan
            enableRotate
          />
          <directionalLight
            position={[1, 1, 1]}
            intensity={10}
            color={0x9cdba6}
          />
          <directionalLight
            position={[-1, -1, -1]}
            intensity={10}
            color={0x9cdba6}
          />
          {showRobot ? (
            <RobotModel
              position={[0.0, -11.0, 0.0]}
              scale={[0.11, 0.11, 0.11]}
              showWireframe={showWireframe}
            />
          ) : (
            <Model />
          )}
        </Canvas>
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => toggleShowWireframe((prev) => !prev)}>
          Toggle wireframe
        </button>
        <button onClick={() => toggleShowRobot((prev) => !prev)}>
          Show {showRobot ? `Model` : `Robot`}
        </button>
      </div>
    </div>
  );
};

export default App;
