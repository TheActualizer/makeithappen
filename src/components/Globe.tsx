import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const locations = [
  { city: "Tel Aviv", coordinates: [32.0853, 34.7818], color: "#6D28D9" },
  { city: "New York", coordinates: [40.7128, -74.0060], color: "#06B6D4" },
  { city: "Detroit", coordinates: [42.3314, -83.0458], color: "#6D28D9" },
  { city: "Miami", coordinates: [25.7617, -80.1918], color: "#06B6D4" },
  { city: "Palo Alto", coordinates: [37.4419, -122.1430], color: "#6D28D9" }
];

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const markersGroup = useRef<THREE.Group>(null);
  
  const [earthMap, earthBump, earthSpec] = useTexture([
    '/earth-day.jpg',
    '/earth-bump.jpg',
    '/earth-spec.jpg'
  ]);

  useEffect(() => {
    if (markersGroup.current) {
      locations.forEach(location => {
        const lat = location.coordinates[0];
        const lon = location.coordinates[1];
        
        // Convert lat/lon to 3D coordinates
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        
        const marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 16, 16),
          new THREE.MeshBasicMaterial({ color: location.color })
        );
        
        // Position the marker
        marker.position.x = -2 * Math.sin(phi) * Math.cos(theta);
        marker.position.y = 2 * Math.cos(phi);
        marker.position.z = 2 * Math.sin(phi) * Math.sin(theta);
        
        markersGroup.current.add(marker);
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (markersGroup.current) {
      markersGroup.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          bumpMap={earthBump}
          bumpScale={0.1}
          specularMap={earthSpec}
          specular={new THREE.Color('#909090')}
          shininess={5}
        />
      </mesh>
      
      <group ref={markersGroup}>
        {/* Location markers will be added here dynamically */}
      </group>
    </>
  );
};

export default Globe;