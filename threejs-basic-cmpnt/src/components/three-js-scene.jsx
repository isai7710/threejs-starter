import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeJSScene = () => {
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
    scene.background = new THREE.Color("#B0CFFF");

    // 2. Add the camera (determines how and what we see in the scene)
    const camera = new THREE.PerspectiveCamera(
      75, // FOV
      currentMount.clientWidth / currentMount.clientHeight, // Aspect Ratio
      0.1, // Near clipping plane
      1000, // Far clipping plane
    );
    camera.position.z = 10; // move the camera away from origin which is where cube will be placed

    // 3. Create and add objects (objects are meshes that are made up of a geometry and material)
    const dodecaGeometry = new THREE.DodecahedronGeometry();
    const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
    const material = new THREE.MeshLambertMaterial({
      color: "#468585",
      emissive: "#468585",
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, material);
    const box = new THREE.Mesh(boxGeometry, material);
    box.position.z = -2.0;
    scene.add(dodeca);
    scene.add(box);

    // 4. Add lighting to the scene
    const light = new THREE.DirectionalLight(0x9cdba6, 10);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 5. Set up the renderer - this draws the scene
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Attach the renderer to our designated div
    // This is where useRef becomes crucial, allowing us to interact with the DOM
    currentMount.appendChild(renderer.domElement);

    // 6. Render the initial scene
    renderer.render(scene, camera);

    // 7. Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZooom = true;
    controls.enablePan = true;

    // 8. animate with animation function (which is called repeatedly to create the animation)
    let boxRadius = 4;
    let boxTheta = 0;
    const animate = () => {
      requestAnimationFrame(animate); // Schedule the next frame
      // rotate objects about x and y axes
      dodeca.rotation.x += 0.01;
      dodeca.rotation.y += 0.01;
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      if (boxTheta >= 2 * Math.PI) {
        boxTheta = 0;
      }

      box.position.x = boxRadius * Math.cos(boxTheta);
      box.position.y = boxRadius * Math.sin(boxTheta);
      boxTheta += 0.1;

      controls.update();

      renderer.render(scene, camera); // Re-render the scene
    };

    // 8. Handle window resizing
    const handleResize = () => {
      if (currentMount) {
        // Get the dimensions of the parent container
        const { clientWidth, clientHeight } = currentMount;

        // Update camera and renderer size
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // start animation loop
    animate();

    // Cleanup function
    // This function is returned from useEffect and will be called when the component unmounts
    // or before the effect runs again (if it had dependencies that changed)
    return () => {
      // The browser will automatically cancel the animation frame when the window/element is destroyed so we don't have to stop the animation loop
      window.removeEventListener("resize", handleResize);
      controls.dispose();

      // Remove the Three.js canvas from the DOM
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects to free up memory
      dodecaGeometry.dispose();
      boxGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // The component renders a div that will contain our Three.js scene
  // The ref attribute connects this div to our useRef, allowing us to access it in the useEffect hook
  return <div ref={mountRef} className="w-[50vw] h-[50vh]" />;
};

export default ThreeJSScene;
