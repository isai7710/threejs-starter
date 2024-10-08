/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 robot.gltf 
*/

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function RobotModel({ showWireframe, ...props }) {
  const { nodes } = useGLTF("model/robot.gltf");

  const wireframeParts = useMemo(() => {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
    });

    const createEdges = (geometry) => {
      return new THREE.EdgesGeometry(geometry, 20); // 30 degrees threshold
    };

    return Object.entries(nodes)
      .map(([key, node]) => {
        if (node.geometry) {
          return {
            key,
            geometry: createEdges(node.geometry),
            material: lineMaterial,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [nodes]);

  const solidModelParts = useMemo(() => {
    const metal = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.8,
      roughness: 0.2,
    });

    return Object.entries(nodes)
      .map(([key, node]) => {
        if (node.geometry) {
          return {
            key,
            geometry: node.geometry,
            material: metal,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [nodes]);

  return (
    <group {...props} dispose={null}>
      {(showWireframe ? wireframeParts : solidModelParts).map(
        ({ key, geometry, material }) =>
          showWireframe ? (
            <lineSegments key={key} geometry={geometry} material={material} />
          ) : (
            <mesh key={key} geometry={geometry} material={material} />
          ),
      )}
    </group>
  );
}

useGLTF.preload("model/robot.gltf");
