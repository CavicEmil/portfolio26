import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function MediaStack({ media, panelRef }) {
  const stackRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { scale: 0.94, opacity: 0, yPercent: 10 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          scroller: panelRef.current,
          horizontal: true,
          start: 'left 60%',
          end: `+=${(cards.length - 1) * 400}`,
          scrub: 1,
          pin: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { scale: 0.94, opacity: 0.4, duration: 1 }, i - 1)
          .to(card, { scale: 1, opacity: 1, yPercent: 0, duration: 1 }, i - 1);
      });
    }, stackRef);
    return () => ctx.revert();
  }, [media]);

  return (
    <div ref={stackRef} className="relative w-[40vw] h-[70vh] flex-shrink-0">
      {media.map((src, i) => (
        <img
          key={src}
          ref={(el) => (cardRefs.current[i] = el)}
          src={src}
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
        />
      ))}
    </div>
  );
}