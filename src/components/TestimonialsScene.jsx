import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import Jukebox from './Jukebox';
import TestimonialOverlay from '../components/TestimonialOverlay';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function TestimonialsScene({ cards }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedCard = cards.find((c) => c.id === selectedId);
  const isMobile = useIsMobile();

 return (
    <div className="relative w-screen h-dvh">
      <Canvas dpr={isMobile ? 1 : [1, 1.5]} camera={
          { position: isMobile? [2, 9, 6] : [0, 3.5, 9], fov: isMobile ? 90 : 50 }
        } 
        gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <Jukebox cards={cards} selectedId={selectedId} onSelect={setSelectedId} />
        {!isMobile && (
          <EffectComposer>
  {/*           <DepthOfField focusDistance={0.06} focalLength={0.15} bokehScale={2} />
  */}          <Noise opacity={0.15} />
            <Vignette darkness={0.6} />
          </EffectComposer>
        )}
      </Canvas>

      {selectedCard && (
        <TestimonialOverlay data={selectedCard} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}