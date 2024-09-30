import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { CylinderGeometry, LineBasicMaterial, EdgesGeometry } from "three";

const Model = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.01;
    }
  });

  const [cylinderEdges, lineMaterial] = useMemo(() => {
    const geometry = new CylinderGeometry(1, 1, 2);
    const edgesGeometry = new EdgesGeometry(geometry, 1);
    const material = new LineBasicMaterial({ color: 0xb85e86 });
    return [edgesGeometry, material];
  }, []);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={cylinderEdges} material={lineMaterial} />
    </group>
  );
};

export default Model;
