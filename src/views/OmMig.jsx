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
        <div ref={containerRef} className='bg-aboutme relative overflow-hidden' id='ommig'>
            <div className="absolute inset-0 bg-mainbg" />
            <div ref={bgPatternRef} className="absolute inset-0 bg-aboutme opacity-0" />
            <div className='relative z-10 flex xl:flex-row flex-col'>
                <img ref={imgRef}
                    src={thatme}
                    className="left-0 top-0 xl:w-[25vw] h-auto object-contain" 
                />
                <div className='flex flex-row items-center justify-around inset-0 overflow-hidden'>
                    <section className="min-h-screen xl:px-36 xl:py-24 flex flex-col gap-8">
                        <div className="font-epic text-white text-[1rem] xl:text-[1.5rem]  whitespace-pre-line m-4 max-w-[90dvw] xl:w-[50vw] xl:pt-[20vh]">
                            {history.map((entry) =>
                            entry.segments.slice(0, entry.revealCount).map((seg, i) => {
                                const key = `${entry.historyId}-${i}`;
                                if (seg.type === 'text') {
                                return <span key={key} ref={(el) => (spanRefs.current[key] = el)}>{seg.value} </span>;
                                }
                                return seg.value === 'waltz'
                                ? <img key={key} src={christophwaltz} className="w-[60dvw] xl:w-[20vw] h-auto inline-block px-6" />
                                : <Marquee key={key}/>
                            })
                            )}
                        </div>
                        {!isTyping && introPlayed && <OptionsRow options={node.options} onSelect={handleOption} />}
                    </section>
                </div>
            </div>
        </div>
        <div className='bg-aboutme pt-[30dvh] relative z-30 overflow-hidden'>
            <div className=' bg-abouttransition h-[50dvh] xl:h-screen w-screen font-epic font-black text-white uppercase text-center m-0 p-0' id='medstil'>
                    <div className='h-[7dvh] xl:h-[30vh] overflow-hidden '>
                        <p className='text-[7dvh] xl:text-[30vh] -translate-y-[5%] tracking-[-15%] -translate-x-[1vw]'>
                        Vi skal slutte af 
                        </p>
                    </div>
                    <div className='h-[9dvh] xl:h-[37vh] overflow-hidden'>
                        <p className='text-[13dvh] xl:text-[55vh] -translate-y-[5%] -translate-x-[1vw] tracking-[-13%] leading-[80%]'>
                            med stil
                        </p>
                    </div>
            </div>
        </div>
        <section className="relative h-screen bg-accent-red overflow-hidden pb-[25vh]">
            <h3 className="absolute inset-0 flex items-center justify-center text-center font-lobster text-[10dvh] text-black/7 uppercase pointer-events-none select-none">
                Udtalelser <br/> & <br/> mere
            </h3>
            <TestimonialsScene cards={testimonials} />
        </section>
    </>
    );
}