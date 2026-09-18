import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import ecshaped from '../assets/ecshaped.png';
import Nyheder from '../components/Nyheder';

const sequence = [
    { from: 'føler med dit brand.', to: 'gå op i dit brand.' },
    { from: 'købe dit grej.', to: 'indleve sig i dit brand.' },
    { from: 'gå op i dit brand.', to: 'købe dit grej.' },
];


const protips = [
    'Pro Tip #1: Hold dit design simpelt og rent!',
    'Pro Tip #3: Overvæld ikke brugeren ved at overbelaste din side!',
    'Pro Tip #13: Gør det klart og præcist for brugeren: brug ikke fancy effekter uden formål!',
    'Pro Tip #17: Vær konsistent: skift ikke designstil midtvejs på din hjemmeside!',
    'Pro Tip #4: Gør det nemt for brugeren: brug for eksempel ikke lodret, svært læselig tekst!',
    'Pro Tip #2: Brug skrifttyper, farver og grafik minimalistisk!',
    'Pro Tip #132: Kritikér ikke dine egne designs foran publikum!',
    'Pro Tip #466: Brug ikke P.S. Krøyers berømte maleri til at tegne nogle linjer på din portfolioside...',
    'Pro Tip #467: Brug heller ikke Carl Blochs mesterværk til at indsætte dig selv i det!'
];

export default function Landing() {
    const containerRef = useRef(null);
    const zoomGroupRef = useRef(null);
    const rotatedTextRef = useRef(null);
    const etopRef = useRef(null);
    const ebotRef = useRef(null);
    const protipRefs = useRef([]);

    const phraseRef = useRef(null);
    const [isScrambling, setIsScrambling] = useState(false);

/*     const protipLayout = useMemo(() => 
        protips.map(() => ({
            top: `${Math.random() * 65 + 90}%`,
            left: `${Math.random() * 100 + 5}%`,
            startRotate: Math.random() * 20 - 10,
            spinDirection: Math.random() < 0.5 ? -1 : 1,
            startAt: 0.6 + Math.random() * 0.25,
        })),
    []); */

    const protipLayout = useMemo(() => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const cols = isMobile ? 2 : 3;
        const rows = Math.ceil(protips.length / cols);
        const colWidth = 100 / cols;
        const rowHeight = 100 / rows;

        return protips.map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const jitterX = (Math.random() - 0.5) * colWidth * 0.3;
            const jitterY = (Math.random() - 0.5) * rowHeight * 0.3;

            return { 
                top: `${row * rowHeight + rowHeight / 2 + jitterY}%`,
                left: `${col * colWidth + colWidth / 2 + jitterX}%`,
                startRotate: Math.random() * 20 - 10,
                spinDirection: Math.random() < 0.5 ? -1 : 1,
                startAt: 0.6 + Math.random() * 0.25,
            };
        });
    }, []);

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
            const mm = gsap.matchMedia();
            mm.add(
                {
                    isMobile:'(max-width: 767px)',
                    isDesktop: '(min-width: 768px)',
                },
                (context) => {
                    const { isMobile } = context.conditions;
                    gsap.set([etopRef.current, ebotRef.current], {
                        rotation: (i) => (i === 0 ? -45 : 45),
                    });

                    const pinEnd = isMobile ? '+=60%' : '+=100%';

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            id: 'landing-transition',
                            trigger: containerRef.current,
                            start: 'top top',
                            end: pinEnd,
                            scrub: 1,
                            pin: true,
                            //markers: true,
                        }
                    });
                    if (isMobile) {
                        tl.to(rotatedTextRef.current, { yPercent: -100, ease: 'none', duration: 1 }, 0)
                            .to(zoomGroupRef.current, { scale: 1.5, transformOrigin: '50% 50%', ease: 'power1.in', duration: 1 }, 0)
                            .to(etopRef.current, { scale: 1.5, x: '30dvw', y: '25dvh', ease: 'power2.out', duration: 0.7 }, 0)
                            .to(ebotRef.current, { z: 500, scale: 1.5, x: '30dvw', y: '-25dvh', ease: 'power2.out', duration: 0.7 }, 0)
                            .to(containerRef.current, { opacity: 0, ease: 'none', duration: 0.3 }, 0.7);
                        } else {
                        tl.to(rotatedTextRef.current, { yPercent: -100, ease: 'none', duration: 1 }, 0)
                            .to(zoomGroupRef.current, { scale: 2.2, transformOrigin: '50% 50%', ease: 'power1.in', duration: 2 }, 0)
                            .to(etopRef.current, { scale: 1.5, x: '10vw', y: '-21vh', ease: 'power2.out', duration: 0.7 }, 0)
                            .to(ebotRef.current, { z: 500, scale: 1.5, y: '-5vh', ease: 'power2.out', duration: 0.7 }, 0)
                            .to(containerRef.current, { opacity: 0, ease: 'none', duration: 4 }, 0.75);
                    }

                    const protipTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 100',
                            end: isMobile ? '=+100%' : '+=200%',
                            scrub: 1,
                            markers: true,
                        },
                    });

                    protips.forEach((_, i) => {
                        const el = protipRefs.current[i];
                        if(!el) return;
                        const { startRotate, spinDirection, startAt } = protipLayout[i];

                        gsap.set(el, { rotation: startRotate, xPercent: -50, yPercent: 100, y: 0 });
                        protipTl.to(
                            el, {
                                y: '-150vh',
                                rotation: startRotate + spinDirection * 360,
                                ease: 'power1.in',
                                duration: 3 - startAt,
                            },
                            startAt
                        );
                    });

                    return () => {};
                }
            );
        }, containerRef);
        
        return () => ctx.revert(); 
    }, []);

    return (
        <>
            <div ref={containerRef} className="bg-hero bg-mainbg h-[100dvh] w-screen relative pt-[70px] overflow-hidden z-20 perspective-distant transform-3d">
                <div ref={zoomGroupRef} className="h-[100dvh] w-screen top-0 left-0">
                    <div ref={etopRef} className='absolute etop -top-[35dvh] -left-[35dvw] xl:top-[30vh] xl:left-[15vw]'/>
                    <div className='absolute emid w-[73dvw] top-[37dvh] left-[27dvw] xl:w-[17vw] xl:top-[45vh] xl:left-[44vw] xl:-translate-y-[3px]' />
                    <div ref={ebotRef}  className='absolute ebot top-[100dvh] -left-[55dvw] xl:top-[93vh] xl:left-[25vw]' />
                    <img src={ecshaped} className='absolute xl:h-[50vh] w-auto top-[24dvh] xl:top-[26vh] left-4 xl:left-[30vw] transform translate-y-[1px]'/>               
                    <div className="absolute pr-8 m-12 pl-4 xl:right-0 xl:top-[20vh] h-screen xl:w-1/3 flex items-start justify-start ">
                        <div className="text-white font-epic xl:text-[1.5rem] text-[clamp(0.5rem,1rem,1.5rem)] font-semibold xl:pr-[5vw]">
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
                <Nyheder />
                <div ref={rotatedTextRef} className="absolute min-h-screen xl:left-[222px] -top-20 left-4 xl:bottom-10 flex items-end">
                    <div className="transform -rotate-90 origin-left flex items-start">
                        <span className="text-white font-bodoni font-black text-[calc(32px+0.7vw)] tracking-[0.1em] whitespace-nowrap">
                            UX/UI Designer & Webudvikler
                        </span>
                    </div>
                </div>
                <div className="absolute left-4 xl:left-0 xl:top-4 inset-0 flex items-center justify-center xl:-translate-x-[30px] xl:translate-y-[50px]">
                    <h1 className="text-white  font-epic font-semibold text-[calc(1.5rem+0.5vw)] tracking-[-0.2rem] uppercase">
                    UX/UI Designer & Webudvikler
                    </h1>
                </div>
            </div>
            
            <div className='bg-mainbg h-screen w-screen fixed top-0 left-0 '>
                {protips.map((text, i) => (
                    <p
                        key={text}
                        ref={(el) => (protipRefs.current[i] = el)}
                        style={{ top: protipLayout[i].top, left: protipLayout[i].left }}
                        className='absolute w-[25vw] md:w-[15vw] text-[1rem] md:text-[1.5rem] font-body text-white text-left'
                    >
                        {text}
                    </p>
                ))}
            </div>
        </>
    );
}