import * as THREE from 'three';

const Globe = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh position={[0, 0, 0]}>
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