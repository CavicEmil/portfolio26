import { useRef, useEffect } from 'react';
import { useTexture, Html } from '@react-three/drei';
import gsap from 'gsap';
import dummyProflie from '../assets/katrina.jpg';


export default function TestimonialCard({ data, position, angle, isSelected, isAnySelected, onSelect, onDeselect }) {
  const meshRef = useRef(null);
  const texture = useTexture(data.profileImg ?? dummyProflie);

  // idle <-> selected
  useEffect(() => {
    const mesh = meshRef.current;
    if (isSelected) {
      gsap.to(mesh.position, { x: 0, y: 0, z: 5, duration: 0.8, ease: 'power3.inOut' });
      gsap.to(mesh.rotation, { x: 0, y: 0, duration: 0.8, ease: 'power3.inOut' });
      gsap.to(mesh.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.8, ease: 'power3.inOut' });
    } else {
      gsap.to(mesh.position, { x: position[0], y: position[1], z: position[2], duration: 0.8, ease: 'power3.inOut' });
      gsap.to(mesh.rotation, { y: angle, duration: 0.8, ease: 'power3.inOut' });
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power3.inOut' });
    }
  }, [isSelected]);

  // idle <-> hover
  const handleOver = () => {
    if (isAnySelected) return;
    gsap.to(meshRef.current.rotation, { y: angle * 0.3, duration: 0.4, ease: 'power2.out' }); // straightens toward viewer
    gsap.to(meshRef.current.position, { x: position[0] * 1.15, z: position[2] * 1.15, duration: 0.4, ease: 'power2.out' }); // steps out of the ring
  };
  const handleOut = () => {
    if (isAnySelected) return;
    gsap.to(meshRef.current.rotation, { y: angle, duration: 0.4, ease: 'power2.out' });
    gsap.to(meshRef.current.position, { x: position[0], z: position[2], duration: 0.4, ease: 'power2.out' });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, angle, 0]}
      onClick={(e) => { e.stopPropagation(); isSelected ? onDeselect() : onSelect(); }}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >
      <planeGeometry args={[1.6, 2.2]} />
      <meshBasicMaterial map={texture} toneMapped={false} />

      {isSelected && (
        <Html center distanceFactor={2}>
          <div className="w-[320px] font-body text-white bg-black/60 backdrop-blur-sm p-6 rounded-lg">
            {data.type === 'cv' ? (
              <a href={data.file} download className="font-bodoni text-[20px] underline">{data.label}</a>
            ) : (
              <>
                <p className="font-bodoni text-[20px] mb-2">{data.name}</p>
                <p className="text-[16px] mb-4">{data.testimonial}</p>
                {data.ratings.map((r) => (
                  <p key={r.adjective}>{r.adjective} — {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</p>
                ))}
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline mt-4 block">LinkedIn</a>
              </>
            )}
          </div>
        </Html>
      )}
    </mesh>
  );
}