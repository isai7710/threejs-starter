import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Robot from "../components/Robot";
import { Leva, useControls } from "leva";

const Hero = () => {
  const controls = useControls("HackerRoom", {
    positionX: {
      value: 2.5,
      min: -10,
      max: 10,
    },
    positionY: {
      value: 2.5,
      min: -10,
      max: 10,
    },
    positionZ: {
      value: 2.5,
      min: -10,
      max: 10,
    },
    scale: {
      value: 1,
      min: -1,
      max: 1,
    },
    rotationX: {
      value: 2.5,
      min: -10,
      max: 10,
    },
    rotationY: {
      value: 2.5,
      min: -10,
      max: 10,
    },
    rotationZ: {
      value: 2.5,
      min: -10,
      max: 10,
    },
  });
  return (
    <section className="min-h-screen w-full flex flex-col gap-2 relative">
      <div className="w-3/4 h-[400px] mx-auto border-2 border-zinc-500 rounded-md sm:mt-20 mt-20">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 9, 30]} />
            <Robot
              position={[
                controls.positionX,
                controls.positionY,
                controls.positionZ,
              ]}
              rotation={[0.4, -0.7, 0.0]}
              scale={[0.06, 0.06, 0.06]}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
            <OrbitControls enableRotate enablePan enableZoom />
          </Suspense>
        </Canvas>
      </div>
      <div className="w-full mx-auto flex flex-col c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi I&apos;m Travis $cott <span className="waving-hand">🌱</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Sound Experiences & Outerwear
        </p>
      </div>
    </section>
  );
};

export default Hero;
