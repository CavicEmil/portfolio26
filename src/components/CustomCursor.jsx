import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const labelRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });
    const quickX = useRef(null);
    const quickY = useRef(null);

    useEffect(() => {
        quickX.current = gsap.quickTo(dotRef.current, 'x', { duration: 0.5, ease: 'power3' });
        quickY.current = gsap.quickTo(dotRef.current, 'y', { duration: 0.5, ease: 'power3' });

        const handleMove = (e) => {
        quickX.current(e.clientX);
        quickY.current(e.clientY);
        };

        const handleEnter = (e) => {
        const target = e.target.closest('[data-cursor]');
        if (!target) return;
        const label = target.dataset.cursor || '';
        labelRef.current.textContent = label;
        gsap.to(dotRef.current, { scale: label ? 6 : 2.5, duration: 0.3, ease: 'power2.out' });
        gsap.to(labelRef.current, { opacity: label ? 1 : 0, duration: 0.2 });
        };

        const handleLeave = (e) => {
        const target = e.target.closest('[data-cursor]');
        if (!target) return;
        gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(labelRef.current, { opacity: 0, duration: 0.2 });
        };

        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseover', handleEnter);
        document.addEventListener('mouseout', handleLeave);

        return () => {
        window.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseover', handleEnter);
        document.removeEventListener('mouseout', handleLeave);
        };
    }, []);

    return (
        <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 "
        >
        <span ref={labelRef} className="text-[3px] font-body text-black opacity-0 whitespace-nowrap" />
        </div>
    );
}