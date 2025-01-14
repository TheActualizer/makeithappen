import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingServiceIconProps {
  iconType: 'cube' | 'sphere' | 'torus';
  color?: string;
  hovered?: boolean;
}

const Icon = ({ iconType, color = '#6D28D9', hovered }: FloatingServiceIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const scale = hovered ? 1.2 : 1;
  
  return (
    <mesh ref={meshRef} scale={scale}>
      {iconType === 'cube' && (
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color={color} />
        </Box>
      )}
      {iconType === 'sphere' && (
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color={color} />
        </Sphere>
      )}
      {iconType === 'torus' && (
        <Torus args={[0.3, 0.15, 16, 32]}>
          <meshStandardMaterial color={color} />
        </Torus>
      )}
    </mesh>
  );
};

export const FloatingServiceIcon = ({ iconType, color, hovered }: FloatingServiceIconProps) => {
  return (
    <div className="w-16 h-16">
      <Canvas
        camera={{ position: [0, 0, 4] }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "default"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Icon iconType={iconType} color={color} hovered={hovered} />
      </Canvas>
    </div>
  );
};