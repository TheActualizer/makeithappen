import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingServiceIconProps {
  iconType: 'finance' | 'legal' | 'logistics' | 'research' | 'data' | 'agentic';
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
    renderer.setSize(48, 48); // Smaller size for better layout
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Create geometry based on service type
    let geometry: THREE.BufferGeometry;
    switch (iconType) {
      case 'finance':
        // Cube with beveled edges for finance
        geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        break;
      case 'legal':
        // Cylinder for legal (like a gavel)
        geometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
        break;
      case 'logistics':
        // Octahedron for logistics (like a package)
        geometry = new THREE.OctahedronGeometry(0.6);
        break;
      case 'research':
        // Icosahedron for research (complex, scientific)
        geometry = new THREE.IcosahedronGeometry(0.6);
        break;
      case 'data':
        // Torus for data (circular flow)
        geometry = new THREE.TorusGeometry(0.4, 0.2, 16, 32);
        break;
      case 'agentic':
        // Dodecahedron for agentic systems (neural network-like)
        geometry = new THREE.DodecahedronGeometry(0.6);
        break;
      default:
        geometry = new THREE.SphereGeometry(0.6, 32, 32);
    }

    // Material with improved visual appeal
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.7,
      roughness: 0.3,
      envMapIntensity: 1,
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Animation
    const animate = () => {
      if (!meshRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      requestAnimationFrame(animate);
      
      // Smooth rotation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      // Scale effect on hover with smoother transition
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

  return <div ref={containerRef} className="w-12 h-12" />;
};