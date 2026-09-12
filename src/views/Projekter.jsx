import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import preview1 from '../assets/proj1/kh-hero.png';
import preview2 from '../assets/proj2/preview.png';
import preview3 from '../assets/proj3/preview.png';
import ProjektDetail from '../components/ProjektDetail';
import MobileProjectCard from '../components/MobileProjectCard';
import DesktopProjectRow from '../components/DesktopProjectRow';


export default function Projekter({ onNavigateKontakt }) {
    const isMobile = useIsMobile();
    const containerRef = useRef(null);
    const mainBgRef = useRef(null);

    const projects = [
        { id: 'kunsthalmuseum', title: 'Kunsthal Museum', tags: ['Branding', 'Webdesign', 'Development'] , preview: preview1 },
        { id: 'blaasol', title: 'Blå Sol Festival', tags: ['Forskning', 'UX/UI Design', 'Development'], preview: preview2 },
        { id: 'spielcafeenadmin', title: 'Spielcafeen Adminpanel', tags: ['Logonsikkerhed', 'CRUD', 'Development'], preview: preview3 }
    ];

    const [selectedId, setSelectedId] = useState(null);
    const defaultTitleRefs = useRef({});
    const hoverTitleRefs = useRef({});
    const tagsRefs = useRef({});
    const previewRefs = useRef({});
    const scrollAreaRef = useRef(null);


    const handleEnter = (id) => {
        gsap.set(tagsRefs.current[id], { yPercent: -100, autoAlpha: 0 });
        gsap.to(defaultTitleRefs.current[id], { yPercent: -100, duration: 0.4, ease: 'power2.out' });
        gsap.to(hoverTitleRefs.current[id], { yPercent: -100, duration: 0.4, ease: 'power2.out' });
        gsap.to(tagsRefs.current[id], { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(previewRefs.current[id], { left: '55vw', duration: 0.6, ease: 'power2.out' });
    };

    const handleLeave = (id) => {
        gsap.to(defaultTitleRefs.current[id], { yPercent: 0, duration: 0.4, ease: 'power2.out' });
        gsap.to(hoverTitleRefs.current[id], { yPercent: 0, duration: 0.4, ease: 'power2.out' });
        gsap.to(tagsRefs.current[id], { yPercent: -100, autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
        gsap.to(previewRefs.current[id], {
            left: '110vw',
            duration: 0.6,
            ease: 'power2.in',
            onComplete: () => gsap.set(previewRefs.current[id], { left: '-50vw' }),
        });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 67%',   
                end: 'top top',
                scrub: 1,
               // markers: true,
            },
            }).fromTo(containerRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out', duration: 2 },
            0
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            projects.forEach((project) => {
            gsap.set(tagsRefs.current[project.id], { yPercent: -100, autoAlpha: 0 });
            });
        }, scrollAreaRef);

        return () => ctx.revert();
    }, []);


    return (
        <div ref={containerRef} id='projekter' className="bg-mainbg relative  xl:min-h-[120vh] w-full overflow-hidden z-30"> 
            <div className='flex flex-col items-start xl:pl-4 xl:pl-36 relative'>
                <h2 id="projekter-title" className='font-bodoni font-semibold text-[48px] text-offwhite pt-6'>udvalgte projekter</h2>
                <div ref={scrollAreaRef} className='flex flex-col items-start xl:gap-6 pt-22 xl:pt-32  font-epic text-[48px] text-white  '>
                    {projects.map((project) =>
                        isMobile ? (
                        <MobileProjectCard key={project.id} project={project} onOpen={() => setSelectedId(project.id)} />
                        ) : (
                        <DesktopProjectRow
                            key={project.id}
                            project={project}
                            onEnter={handleEnter}
                            onLeave={handleLeave}
                            onOpen={() => setSelectedId(project.id)}
                            refs={{ defaultTitleRefs, hoverTitleRefs, tagsRefs, previewRefs }}
                        />
                        )
                    )}
                    
                </div>
                {selectedId && (
                    <ProjektDetail projectId={selectedId} onNavigateKontakt={onNavigateKontakt} onClose={() => setSelectedId(null)} scrollAreaRef={scrollAreaRef} />
                )}
            </div>
        </div>
    );
};