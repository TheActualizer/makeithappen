import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere } from '@react-three/drei';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Using a placeholder color material instead of texture for now
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial 
          color="#1e40af"
          metalness={0.5}
          roughness={0.7}
        />
      </Sphere>
    </group>
  );
};

export default Globe;