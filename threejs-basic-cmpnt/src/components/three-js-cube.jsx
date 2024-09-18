import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeJSCube = () => {
  // useRef creates a mutable reference that persists for the lifetime of the component
  // it's used here to store a reference to the DOM element where we'll render our Three.js scene
  const mountRef = useRef(null);

  // useEffect is used to perform 'side effects' in function components
  // in this case, it's used to set up and manage our Three.js scene
  useEffect(() => {
    // Capture the current value of mountRef
    // This ensures we're consistent in working with the current DOM element throughout the effect
    const currentMount = mountRef.current;

    // ---[[ Three.js Setup ]]---

    // 1. Create the scene (container for all objects, cameras, and lights)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F0F0F0");

    // 2. Add the camera (determines how and what we see in the scene)
    const camera = new THREE.PerspectiveCamera(
      75, // FOV
      window.innerWidth / window.innerHeight, // Aspect Ratio
      0.1, // Near clipping plane
      1000, // Far clipping plane
    );
    camera.position.z = 5; // move the camera away from origin which is where cube will be placed

    // 3. Create and add a cube object
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({
      color: "#468585",
      emissive: "#468585",
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 4. Add lighting to the scene
    const light = new THREE.DirectionalLight(0x9cdba6, 10);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 5. Set up the renderer - this draws the scene
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    // Attach the renderer to our designated div
    // This is where useRef becomes crucial, allowing us to interact with the DOM
    currentMount.appendChild(renderer.domElement);

    // 6. Render the initial scene
    renderer.render(scene, camera);

    // 7. animate with this animation function (which is called repeatedly to create the animation)
    const animate = () => {
      requestAnimationFrame(animate); // Schedule the next frame
      cube.rotation.x += 0.01; // Rotate the cube on x-axis
      cube.rotation.y += 0.01; // Rotate the cube on y-axis
      renderer.render(scene, camera); // Re-render the scene
    };

    // start animation loop
    animate();

    // Cleanup function
    // This function is returned from useEffect and will be called when the component unmounts
    // or before the effect runs again (if it had dependencies that changed)
    return () => {
      // The browser will automatically cancel the animation frame when the window/element is destroyed so we don't have to stop the animation loop

      // Remove the Three.js canvas from the DOM
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects to free up memory
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // The component renders a div that will contain our Three.js scene
  // The ref attribute connects this div to our useRef, allowing us to access it in the useEffect hook
  return <div ref={mountRef} className="w-full h-auto" />;
};

export default ThreeJSCube;
