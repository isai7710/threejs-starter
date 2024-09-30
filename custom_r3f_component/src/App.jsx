import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./components/model";

const App = () => {
  return (
    <div className="w-[50vw] h-[50vh] rounded-lg border border-green-500">
      <Canvas className="rounded-md" gl={{ alpha: true }}>
        <OrbitControls enableZoom enablePan enableRotate />
        <directionalLight
          position={[1, 1, 1]}
          intensity={10}
          color={0x9cdba6}
        />
        <Model />
      </Canvas>
    </div>
  );
};

export default App;
