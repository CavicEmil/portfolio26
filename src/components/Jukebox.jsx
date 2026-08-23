import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import TestimonialCard from './TestimonialCard';

const RADIUS = 5.25;

export default function Jukebox({ cards, selectedId, onSelect }) {
  const groupRef = useRef(null);
  const paused = useRef(false);
  const hoverCount = useRef(0);

  useFrame((state, delta) => {
    state.events.update(); 
    state.camera.lookAt(0, 0, 0);
    if (!paused.current) groupRef.current.rotation.y += delta * 0.08;
  });

  useEffect(() => {
    paused.current = Boolean(selectedId) || hoverCount.current > 0;
  }, [selectedId]);

  const handleHoverStart = () => {
    hoverCount.current += 1;
    paused.current = true;
  };
  const handleHoverEnd = () => {
    hoverCount.current = Math.max(0, hoverCount.current - 1);
    if (hoverCount.current === 0 && !selectedId) paused.current = false;
  };

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {cards.map((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const position = [Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS];
        const rotationY = Math.PI / 2 + angle; 

        return (
          <TestimonialCard
            key={card.id}
            data={card}
            position={position}
            rotationY={rotationY}
            isSelected={selectedId === card.id}
            isAnySelected={selectedId !== null}
            onSelect={() => onSelect(selectedId === card.id ? null : card.id)}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        );
      })}
    </group>
  );
}