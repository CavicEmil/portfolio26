import { useRef, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { geometry } from 'maath';
import gsap from 'gsap';
import dummymedia from '../assets/dummymedia.svg'

extend(geometry);

export default function TestimonialCard({
  data, position, rotationY, isSelected, isAnySelected,
  onSelect, onHoverStart, onHoverEnd,
}) {
  const meshRef = useRef(null);
  const texture = useTexture(data.profileImg ?? dummymedia);

  useEffect(() => {
    const mesh = meshRef.current;
    if (isSelected) {
      gsap.to(mesh.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(mesh.position, { x: position[0], y: position[1], z: position[2], duration: 0.6, ease: 'power3.inOut' });
      gsap.to(mesh.rotation, { y: rotationY, duration: 0.6, ease: 'power3.inOut' });
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'power3.inOut' });
    }
  }, [isSelected]);

  const handleOver = (e) => {
    e.stopPropagation();
    onHoverStart();
    if (isAnySelected) return;
    gsap.to(meshRef.current.position, { y: position[1] + 0.25, duration: 0.3, ease: 'power2.out' });
  };

  const handleOut = () => {
    onHoverEnd();
    if (isAnySelected) return;
    gsap.to(meshRef.current.position, { y: position[1], duration: 0.3, ease: 'power2.out' });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >
      <roundedPlaneGeometry args={[1.6, 2.2, 0.08]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={2} />
    </mesh>
  );
}