import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingServiceIconProps {
  iconType: 'cube' | 'sphere' | 'torus';
  color?: string;
  hovered?: boolean;
}

export const FloatingServiceIcon = ({ iconType, color = '#06B6D4', hovered = false }: FloatingServiceIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(64, 64);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Geometry based on icon type
    let geometry: THREE.BufferGeometry;
    switch (iconType) {
      case 'cube':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(0.6, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
        break;
    }

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.5,
      roughness: 0.5,
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Animation
    const animate = () => {
      if (!meshRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      requestAnimationFrame(animate);
      
      // Rotate the mesh
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      // Scale effect on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
      rendererRef.current?.dispose();
    };
  }, [iconType, color]);

  // Update scale on hover change
  useEffect(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.set(targetScale, targetScale, targetScale);
  }, [hovered]);

  return <div ref={containerRef} className="w-16 h-16" />;
};