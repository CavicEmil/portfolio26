import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import ecshaped from '../assets/ecshaped.png';

export default function Landing() {
    const containerRef = useRef(null);
    const zoomGroupRef = useRef(null);
    const rotatedTextRef = useRef(null);
    const etopRef = useRef(null);
    const ebotRef = useRef(null);


  /*   const phrases = [
        'gå op i dit brand.',
        'føler med dit brand.',
        'købe dit grej.',
    ]; */

    const sequence = [
    { from: 'føler med dit brand.', to: 'gå op i dit brand.' },
    { from: 'købe dit grej.', to: 'føler med dit brand.' },
    { from: 'gå op i dit brand.', to: 'købe dit grej.' },
    ];

    const phraseRef = useRef(null);
    const [isScrambling, setIsScrambling] = useState(false);

    const [isFinished, setIsFinished] = useState(false);


    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ repeat: -1 });

        sequence.forEach(({ from, to }) => {
        tl.call(() => {
            phraseRef.current.textContent = from;
        })
            .to(phraseRef.current, {
            duration: 0.5,
            scrambleText: {
                text: to,
                chars: 'upperAndLowerCase',
                speed: 1,
                //revealDelay: 0.1,
            },
            onStart: () => setIsScrambling(true),
            onComplete: () => setIsScrambling(false),
            })
            .to({}, { duration: 3 });
        });
    }, phraseRef);

    return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                id: 'landing-transition',
                trigger: containerRef.current,
                start: 'top top',
                end: '+=100%',   
                scrub: 1,          
                pin: true,          
                //markers: true
            },
            onComplete: () => {
                console.log("finished with scroll")
                setIsFinished(true);
            },
        });
        tl.to(rotatedTextRef.current, {
            yPercent: -100,       
            ease: 'none',
            duration: 1,
        }, 0)
        .to(zoomGroupRef.current, {
            scale: 2.2,
            transformOrigin: '50% 50%',
            ease: 'power1.in',
            duration: 1,  
        }, 0)
        .to([etopRef.current], {
            scale: 1.5,
            x: '10vw',
            y: '-9vh',
            ease: 'power2.out',
            duration: 0.3,          
        }, 0)
        .to([ebotRef.current], {
            scale: 1.5,
            y: '-10vh',
            ease: 'power2.out',
            duration: 0.3,        
        }, 0)
       .to(containerRef.current, { 
            opacity: 0, 
            ease: 'none', 
            duration: 0.25,
        }, 0.75)      
        }, containerRef);
        
        return () => ctx.revert(); 
    }, []);

    return (
    <>
        <div ref={containerRef} className="bg-hero bg-mainbg h-screen w-full relative pt-[70px] overflow-hidden z-80">
            <div ref={zoomGroupRef} className="h-screen w-screen top-0 left-0">
                <div ref={etopRef} className='absolute etop top-[55vh] left-[30vw]'></div>
                <div className='absolute emid top-[46vh] left-[44vw]'></div>
                <div ref={ebotRef}  className='absolute ebot top-[60vh] left-[20vw]'></div>
                <img src={ecshaped} className='absolute h-[50vh] w-auto top-[26vh] left-[30vw] translate-y-[1px]'/>               
                <div className="absolute pr-8 right-0 top-[300px] h-screen w-1/3 flex items-start justify-start ">
                    <div className="text-white font-epic text-[26px] font-semibold pr-[200px]">
                        <p>Hej, jeg er Emil.</p>
                        <p>Jeg læser Multimediedesign.</p>
                        <p>Jeg tror på, at godt design handler om at forstå brugerens behov.</p>
                        <p>Jeg tilpasser mig til dit brand, så det fortæller din historie.</p>
                        <p>
                            Jeg kan hjælpe dig med at få folk til at &nbsp;
                            <span
                                ref={phraseRef}
                                className={`transition-all duration-250 ${isScrambling ? 'font-bodoni' : 'font-epic'}`}
                            />
                        </p> 
                        <br/>
                        <p>Jeg designer hjemmesider.</p>
                    </div>
                </div>
            </div>
            <div ref={rotatedTextRef} className="absolute h-screen left-[222px] bottom-10 flex items-end">
                <div className="transform -rotate-90 origin-left flex items-start">
                    <span className="text-white font-bodoni font-black text-[32px] md:text-[calc(32px+1vw)] lg:text-[calc(32px+1vw)] tracking-[0.1em] whitespace-nowrap">
                        UX/UI Designer & Udvikler
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white font-epic font-semibold text-[32px] tracking-[-0.2rem] uppercase">
                UX/UI Designer & Udvikler
                </h1>
            </div>
        </div>
        { !isFinished &&
        <div className="bg-mainbg py-[30vh] min-h-[120vh] w-full overflow-hidden z-20 fixed top-0"> 
            <h2 id="projekter-title" className='font-bodoni font-semibold text-[48px] text-offwhite pt-[10vh] '>udvalgte projekter</h2>
        </div>
        }
    </>

    );
}