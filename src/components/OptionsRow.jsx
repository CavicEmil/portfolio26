import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function OptionsRow({ options, onSelect }) {
  const refs = useRef([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    options.forEach((_, i) => {
      const el = refs.current[i];
      if (!el) return;
      const isHovered = hovered === i;
      const isOther = hovered !== null && !isHovered;
      gsap.to(el, {
        scale: isHovered ? 1.2 : 1,
        opacity: isOther ? 0.3 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, [hovered]);

  return (
    <div className="flex gap-8" onMouseLeave={() => setHovered(null)}>
      {options.map((opt, i) => (
        <button
          key={opt.label}
          ref={(el) => (refs.current[i] = el)}
          onMouseEnter={() => setHovered(i)}
          onClick={() => onSelect(opt)}
          className={`font-scribbling text-white text-[20px] ${opt.allCaps ? 'uppercase' : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}