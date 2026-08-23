import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';

const OFFSET = 15;

export default function MediaStack({ media }) {
  const [order, setOrder] = useState(media.map((_, i) => i));
  const [ratio, setRatio] = useState(null);
  const cardRefs = useRef({});
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    order.forEach((mediaIndex, depth) => {
      const el = cardRefs.current[mediaIndex];
      if (!el) return;

      gsap.set(el, { zIndex: order.length - depth });

      if (isFirstRender.current) {
        gsap.set(el, { x: depth * OFFSET, y: depth * OFFSET });
      } else {
        gsap.to(el, {
          x: depth * OFFSET,
          y: depth * OFFSET,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    });
    isFirstRender.current = false;
  }, [order]);

  const handleClick = () => {
    setOrder((prev) => [...prev.slice(1), prev[0]]); 
  };

  const handleFirstImageLoad = (e) => {
    if (ratio) return; 
    setRatio(e.target.naturalWidth / e.target.naturalHeight);
  };

  return (
    <div className="relative h-[60vh] flex-shrink-0 mr-16"
      style={{ aspectRatio: ratio ?? '3/5' }}
      >
      {media.map((src, i) => (
        <img
        data-cursor='click mig'
          key={src}
          ref={(el) => (cardRefs.current[i] = el)}
          src={src}
          onLoad={handleFirstImageLoad}
          onClick={handleClick}
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer"
        />
      ))}
    </div>
  );
}