/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 robot.gltf 
*/

import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial, LineBasicMaterial, EdgesGeometry } from "three"; // Importing MeshBasicMaterial

export default function Model(props) {
  const { nodes } = useGLTF("models/robot.gltf");

  // Define a new material for wireframe
  const wireframeMaterial = new MeshBasicMaterial({
    color: 0x00ffffff, // You can change the color if needed
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const lineMaterial = new LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={new EdgesGeometry(nodes.Robot_Arm_Base_2_Isai_node.geometry)}
        material={lineMaterial}
      />
      <mesh
        geometry={new EdgesGeometry(nodes.Arm2_Isai_node.geometry)}
        material={lineMaterial}
      />
      <mesh
        geometry={nodes.Cylinder_Base_Isai_node.geometry}
        material={wireframeMaterial}
      />
      <mesh geometry={nodes.nodes6.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes7.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes8.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes9.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes10.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes11.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes12.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes13.geometry} material={wireframeMaterial} />
      <mesh geometry={nodes.nodes14.geometry} material={wireframeMaterial} />
      <mesh
        geometry={nodes.Arm1_Isai_20_node.geometry}
        material={wireframeMaterial}
      />
    </group>
  );
}

useGLTF.preload("models/robot.gltf");
