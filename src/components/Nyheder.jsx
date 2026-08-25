import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';


const items = [
  'i Aarhus regionen','søges', 'studiejob', 'hurtigst muligt', 'søges', 'praktik','opstart Januar 27',
  'i Aarhus regionen','søges', 'studiejob', 'hurtigst muligt', 'søges', 'praktik','opstart Januar 27',
  'i Aarhus regionen','søges', 'studiejob', 'hurtigst muligt', 'søges', 'praktik','opstart Januar 27',
];

 const ROTATION = -2

 function MarqueeContent() {
  return (
    <div className="flex gap-12 shrink-0">
      {items.map((item, i) => (
        <span
          key={i}
          className={`flex items-center gap-2 whitespace-nowrap ${
            i % 3 ? 'font-epic' : 'font-bodoni font-bold text-[32px]'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Nyheder() {
  const containerRef = useRef(null);
  const copyRefs = useRef([]);
  const tweens = useRef([]);
  const trackRef = useRef(null);

  /* useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
        gsap.set(trackRef.current, { rotate: ROTATION, transformOrigin: 'left center' });

        const angleRad = (ROTATION * Math.PI) / 180;
        const distance = trackRef.current.scrollWidth / 2;
        const proxy = { p: 0 };

        gsap.to(proxy, {
            p: -distance,
            duration: 10,
            ease: 'none',
            repeat: -1,
            modifiers: {
                p: gsap.utils.wrap(-distance, 0)
            },
            onUpdate: () => {
                gsap.set(trackRef.current, {
                  x: Math.cos(angleRad)*proxy.p, 
                  y: Math.sin(angleRad)*proxy.p, 
                });
            }, 
        }); 
    }, trackRef);
    return () => ctx.revert();
  }, []); */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tweens.current = copyRefs.current.map((el) => 
      gsap.to(el, {xPercent: -100, duration: 25, ease: 'none', repeat: -1})
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = () => tweens.current.forEach((t) => t.pause());
  const handleLeave = () => tweens.current.forEach((t) => t.play());

  return (
    <div ref={containerRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
    style={{ transform: `rotateZ(${ROTATION}deg)`, transformOrigin:'left center'}}
      className="absolute bottom-[10vh] right-0 w-full overflow-hidden whitespace-nowrap " >
      <div ref={trackRef} 
        className="flex gap-12 w-max font-epic uppercase text-white bg-accent-red text-[28px] py-2 leading-none border-t-1 border-b-1 border-mainbg ">
        {[0, 1].map((item, i) => (
          <div key={i} ref={(el) => (copyRefs.current[i] = el)} style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
            <MarqueeContent />
          </div>
        ))}
      </div>
    </div>
  );
}