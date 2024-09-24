import { PerspectiveCamera } from "@react-three/drei";
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
      value: 0,
      min: -1,
      max: 1,
    },
    rotation: {
      value: 2.5,
      min: -10,
      max: 10,
    },
  });
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi I&apos;m Travis $cott <span className="waving-hand">🌱</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Sound Experiences & Outerwear
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <Robot
              position={[
                controls.positionX,
                controls.positionY,
                controls.positionZ,
              ]}
              rotation={[
                controls.rotation,
                controls.rotation,
                controls.rotation,
              ]}
              scale={[controls.scale, controls.scale, controls.scale]}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
