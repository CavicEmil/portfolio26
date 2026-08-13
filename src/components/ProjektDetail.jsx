import { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


export default function ProjektDetail() {

    const panelRef = useRef(null);
     const tlRef = useRef(null);

    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        tlRef.current = gsap.timeline().fromTo(
            panelRef.current,
            {
            motionPath: {
                path: [{ x: '30vw', y: '-70vh' }, { x: '5vw', y: '-15vh' }, { x: 0, y: 0 }],
                curviness: 1.5,
            },
            },
            {
            motionPath: {
                path: [{ x: '30vw', y: '-70vh' }, { x: '5vw', y: '-15vh' }, { x: 0, y: 0 }],
                curviness: 1.5,
            },
            duration: 0.8,
            ease: 'power2.out',
            }
        );
        }, panelRef);
        return () => ctx.revert();
    }, []);

    const handleClose = () => {
        tlRef.current.eventCallback('onReverseComplete', onClose);
        tlRef.current.reverse();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
        if (panelRef.current && !panelRef.current.contains(e.target)) handleClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
        <div ref={panelRef} className=" fixed top-0 right-0 h-screen w-[60vw] bg-mainbg z-70
            bg-portfoliobg w-[200vw] h-[90vh] font-white font-bodoni">
            Here be project details
        </div>
    )
}