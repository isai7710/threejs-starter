import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeJSCube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Capture the current value of mountRef
    const currentMount = mountRef.current;

    // 1. Create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F0F0F0");

    // 2. Add the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // 3. Create and add a cube object
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({
      color: "#468585",
      emissive: "#468585",
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 4. Add lighting
    const light = new THREE.DirectionalLight(0x9cdba6, 10);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 5. Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    // Add renderer to the DOM
    currentMount.appendChild(renderer.domElement);

    // 6. Animate the scene
    renderer.render(scene, camera);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return <div ref={mountRef} className="w-full h-auto" />;
};

export default ThreeJSCube;
