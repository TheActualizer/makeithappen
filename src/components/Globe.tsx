import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial>
          <primitive
            attach="map"
            object={new THREE.TextureLoader().load('/photo-1470071459604-3b5ec3a7fe05')}
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};

export default Globe;