import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import Jukebox from './Jukebox';
import TestimonialOverlay from '../components/TestimonialOverlay';

export default function TestimonialsScene({ cards }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedCard = cards.find((c) => c.id === selectedId);

 return (
    <div className="relative w-full h-screen">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 3.5, 9], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <Jukebox cards={cards} selectedId={selectedId} onSelect={setSelectedId} />
        <EffectComposer>
{/*           <DepthOfField focusDistance={0.06} focalLength={0.15} bokehScale={2} />
 */}          <Noise opacity={0.15} />
          <Vignette darkness={0.6} />
        </EffectComposer>
      </Canvas>

      {selectedCard && (
        <TestimonialOverlay data={selectedCard} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}