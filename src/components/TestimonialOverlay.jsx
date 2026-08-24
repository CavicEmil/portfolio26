import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import close from '../assets/close.svg';

export default function TestimonialOverlay({ data, onClose }) {
  const panelRef = useRef(null);
  const backdropRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { autoAlpha: 0, scale: 0.92 });
      gsap.to(backdropRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.to(panelRef.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    }, panelRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      <div ref={backdropRef} onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      <div
        ref={panelRef}
        className="max-w-[39vw] fixed inset-x-[33%] inset-y-[10%] bg-mainbg/30 z-50 rounded-lg p-12 overflow-y-auto font-bodoni text-offwhite"
      >
        <img src={close}
          onClick={onClose}
          aria-label="Luk"
          className="absolute top-6 right-6 w-12 h-12 cursor-pointer"
        />

        {data.type === 'pdf' && (
          <div className="flex flex-col gap-4 mt-6 font-epic text-white">
            <embed src={data.file} type="application/pdf" className="w-full h-[70vh] rounded-lg" />
            <a href={data.file} download className="underline hover:text-accent-red transition-colors">
              Download {data.label}
            </a>
          </div>
        )}
        {data.type === 'testimonial' && (
          <div className="flex gap-12 items-start">
            <div className="min-w-[200px] font-epic text-white">
            <img src={data.profileImg} className="w-[200px] h-[200px] object-cover rounded-full flex-shrink-0" />
            {data.phone &&
              (
                <a href={`tel:${data.phone}`} target='_blank' linktype='email' className="underline mt-6 block hover:text-accent-red transition-colors">
                  Tel. {data.phone}</a>
              )}
              {data.email &&
              (
                <a href={`mailto:${data.email}`} target='_blank' linktype='email' className="underline mt-6 block hover:text-accent-red transition-colors">
                  E-Mail</a>
              )}
              {data.linkedin &&
              (
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline mt-6 block hover:text-accent-red transition-colors">LinkedIn</a>
              )}
              {data.portfolio && (
                <a href={data.portfolio} target="_blank" rel="noreferrer" className="underline mt-6 block hover:text-accent-red transition-colors">Julias portfolio</a>
              )}
            </div>
            <div className="font-body text-white">
              <h3 className="font-epic text-[32px] text-white my-4">{data.name}</h3>
              <p className="text-[20px] leading-relaxed mb-6">{data.testimonial}</p>
              {data.ratings.map((r) => (
                <p key={r.adjective}>{r.adjective} — {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</p>
              ))}
            </div>
          </div>
        )}
        {data.type === 'personality' && (
          <div className="flex gap-12 items-start">
            <div className="font-body text-white">
              <h3 className="font-epic text-[32px] text-white my-4">{data.title}</h3>
              <p className="text-[20px] leading-relaxed mb-6">{data.tekst}</p>
              <a href={data.link} target="_blank" rel="noreferrer" className="underline mt-6 block hover:text-accent-red transition-colors">Se det hele her</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}