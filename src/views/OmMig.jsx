import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { dialogue } from '../data/dialogue';
import { useDialoguePlayer } from '../hooks/useDialoguePlayer';
import thatme from '../assets/aboutmepic.png';
import christophwaltz from '../assets/christophwaltz.gif';
import Marquee from '../components/Marquee';
import OptionsRow from '../components/OptionsRow';
import TestimonialsScene from '../components/TestimonialsScene';
import { testimonials } from '../data/testimonials';

export default function OmMig({ onNavigateKontakt }) {
    const { node, history, spanRefs, play, isTyping } = useDialoguePlayer(dialogue);

    const containerRef = useRef(null);
    const bgPatternRef = useRef(null);
    const imgRef = useRef(null);
    const introStarted = useRef(false);
    const [introPlayed, setIntroPlayed] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 60%',
                        end: 'top top',
                        scrub: 1,
                        //markers: true,
                        onLeave: () => {
                        if (!introStarted.current) {
                            introStarted.current = true;
                            play('intro');
                            setIntroPlayed(true);
                        }
                    },
                },
            });

            tl.fromTo(imgRef.current,
                { yPercent: +100 },
                { yPercent: 0, ease: 'power2.out', duration: 6 },
                0
            )
            .to(bgPatternRef.current, {
                opacity: 1,
                ease: 'none',
                duration: 2,
            }, 5);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleOption = (option) => {
        if (option.action === 'scrollKontakt') {
        onNavigateKontakt();
        } else if (option.action === 'scrollToStil') {
        gsap.to(window, { scrollTo: { y: '#medstil', autoKill: false }, duration: 1, ease: 'power2.inOut' });
        } else if (option.action === 'goto') {
        play(option.target);
        }
    };

    return (
        <>
        <div ref={containerRef} className='bg-aboutme relative'>
            <div className="absolute inset-0 bg-mainbg" />
            <div ref={bgPatternRef} className="absolute inset-0 bg-aboutme opacity-0" />
            <div className='relative z-10 flex flex-row'>
                <img ref={imgRef}
                    src={thatme}
                    className="left-0 top-0 w-[25vw] h-auto object-contain" 
                />
                <div className='flex flex-row items-center justify-around inset-0  overflow-hidden'>
                    <section className="min-h-screen  px-36 py-24 flex flex-col gap-8">
                        <div className="font-scribbling text-white text-[24px] whitespace-pre-line w-[50vw] pt-[25vh]">
                            {history.map((entry) =>
                            entry.segments.slice(0, entry.revealCount).map((seg, i) => {
                                const key = `${entry.historyId}-${i}`;
                                if (seg.type === 'text') {
                                return <span key={key} ref={(el) => (spanRefs.current[key] = el)}>{seg.value} </span>;
                                }
                                return seg.value === 'waltz'
                                ? <img key={key} src={christophwaltz} className="w-[20vw] h-auto inline-block px-6" />
                                : <Marquee key={key}/>
                            })
                            )}
                        </div>
                        {!isTyping && introPlayed && <OptionsRow options={node.options} onSelect={handleOption} />}
                    </section>
                </div>
            </div>
        </div>
        <div className='bg-aboutme pt-[30vh]'>
            <div className=' bg-abouttransition h-screen w-full font-epic font-black text-white uppercase text-center m-0 p-0' id='medstil'>
                    <div className='h-[30vh] overflow-hidden '>
                        <p className='text-[30vh] -translate-y-[5%] tracking-[-15%] -translate-x-[1vw]'>
                        Vi skal slutte af 
                        </p>
                    </div>
                    <div className='h-[37vh] overflow-hidden'>
                        <p className='text-[55vh] -translate-y-[5%] -translate-x-[1vw] tracking-[-13%] leading-[80%]'>
                            med stil
                        </p>
                    </div>
            </div>
        </div>
        <section className="relative h-screen bg-accent-red overflow-hidden">
            <h3 className="absolute inset-0 flex items-center justify-center text-center font-lobster text-[10vh] text-black/7 uppercase pointer-events-none select-none">
                Udtalelser <br/> & <br/> mere
            </h3>
            <TestimonialsScene cards={testimonials} />
        </section>
    </>
    );
}