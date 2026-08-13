import { dialogue } from '../data/dialogue';
import { useDialoguePlayer } from '../hooks/useDialoguePlayer';
import { useEffect, useRef, useState } from 'react';
import thatme from '../assets/aboutmepic.png';
import gsap from 'gsap';
import christophwaltz from '../assets/christophwaltz.gif';
import Marquee from '../components/Marquee';
import OptionsRow from '../components/OptionsRow';
import TestimonialsScene from '../components/TestimonialsScene';
import { testimonials } from '../data/testimonials';

export default function OmMig({ onNavigateKontakt }) {
  const { node, history, spanRefs, play, isTyping } = useDialoguePlayer(dialogue);

  useEffect(() => {
    play('intro');
  }, []);

  const handleOption = (option) => {
    if (option.action === 'scrollKontakt') {
      onNavigateKontakt();
    } else if (option.action === 'scrolltoStil') {
      gsap.to(window, { scrollTo: { y: '#medstil', autoKill: false }, duration: 1, ease: 'power2.inOut' });
    } else if (option.action === 'goto') {
      play(option.target);
    }
  };

  return (
    <div className='bg-aboutme pt-[10vh] relative'>
        <div className='flex flex-row'>
            <img
                src={thatme}
                className="left-0 top-0 w-[25vw] h-auto object-contain" 
            />
            <div className='flex flex-row items-center justify-around inset-0 overflow-hidden'>
                <section className="min-h-screen  px-36 py-24 flex flex-col gap-8">
                    <div className="font-scribbling text-white text-[24px] whitespace-pre-line w-[50vw]">
                        {history.map((entry) =>
                        entry.segments.slice(0, entry.revealCount).map((seg, i) => {
                            const key = `${entry.historyId}-${i}`;
                            if (seg.type === 'text') {
                            return <span key={key} ref={(el) => (spanRefs.current[key] = el)}>{seg.value} </span>;
                            }
                            return seg.value === 'waltz'
                            ? <img key={key} src={christophwaltz} className="w-[20vw] h-auto inline-block px-6" />
                            : <div className='py-12'><Marquee key={key}/></div>;
                        })
                        )}
                    </div>
                    {!isTyping && <OptionsRow options={node.options} onSelect={handleOption} />}
                </section>
            </div>
        </div>
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
        <section className="relative h-screen bg-accent-red overflow-hidden">
            <h3 className="absolute inset-0 flex items-center justify-center text-center font-lobster text-[10vh] text-black/7 uppercase pointer-events-none select-none">
                Udtalelser <br/> & <br/> mere
            </h3>
            <TestimonialsScene cards={testimonials} />
        </section>
    </div>
  );
}