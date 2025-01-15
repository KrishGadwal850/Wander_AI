import React, { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Scene = () => {
  const texture = useTexture("/ENJOY.png");
  const rotateRef = useRef(null);
  const groupRef = useRef(null);
  useFrame((state, delta) => {
    rotateRef.current.rotation.y += delta * 0.5; // Constant rotation in y
    // groupRef.current.rotation.x = -mouse.y * 0.5; // Follow mouse in x
    groupRef.current.rotation.y = mouse.x * 0.7;
    // groupRef.current.rotation.z = mouse.y * 0.2;
  });

  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        // y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <group position={[0, 0.5, 0]} rotation={[0.28, 0.5, 0.2]} ref={groupRef}>
      <mesh ref={rotateRef}>
        <cylinderGeometry args={[1.5, 1.5, 1.5, 20, 20, true]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Scene;
