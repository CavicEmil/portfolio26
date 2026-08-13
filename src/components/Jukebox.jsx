import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import TestimonialCard from './TestimonialCard';

const RADIUS = 4;

export default function Jukebox({ cards }) {
  const groupRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const paused = useRef(false);

  useFrame((_, delta) => {
    if (!paused.current) groupRef.current.rotation.y += delta * 0.08; // slow constant spin
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const position = [Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS];
        return (
          <TestimonialCard
            key={card.id}
            data={card}
            position={position}
            angle={angle}
            isSelected={selectedId === card.id}
            isAnySelected={selectedId !== null}
            onSelect={() => { paused.current = true; setSelectedId(card.id); }}
            onDeselect={() => { setSelectedId(null); paused.current = false; }}
          />
        );
      })}
    </group>
  );
}