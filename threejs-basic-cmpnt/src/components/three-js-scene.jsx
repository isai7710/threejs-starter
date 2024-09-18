import clsx from "clsx";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function ThreeJSScene({ color, bgColor }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [sceneObjects, setSceneObjects] = useState(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0x9cdba6, 10);
    light.position.set(1, 1, 1);
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    // Create geometries and materials
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

    setSceneObjects({ dodeca, box, material });

    let boxRadius = 4;
    let boxTheta = 0;

    const animate = () => {
      requestAnimationFrame(animate);

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
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (currentMount) {
        const { clientWidth, clientHeight } = currentMount;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      dodecaGeometry.dispose();
      boxGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array, scene setup runs only once

  // Update colors when props change
  useEffect(() => {
    if (sceneObjects) {
      const newColor = color ? "#f68e87" : "#468585";
      sceneObjects.material.color.setHex(
        parseInt(newColor.replace("#", "0x"), 16),
      );
      sceneObjects.material.emissive.setHex(
        parseInt(newColor.replace("#", "0x"), 16),
      );
    }
  }, [color, sceneObjects]);

  return (
    <div
      ref={mountRef}
      className={clsx(
        "w-[50vw] h-[50vh] bg-opacity-10 rounded-xl",
        bgColor ? "bg-sky-100" : "bg-lime-500",
      )}
    />
  );
}

export default ThreeJSScene;
