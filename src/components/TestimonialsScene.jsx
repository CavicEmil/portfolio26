import { Canvas } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import Jukebox from './Jukebox';

export default function TestimonialsScene({ cards }) {
  return (
    <Canvas onPointerMissed={() => setSelectedId(null)} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true }}>
      <ambientLight intensity={1} />
      <Jukebox cards={cards} />
      <EffectComposer>
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={4} />
        <Noise opacity={0.15} />
        <Vignette darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}