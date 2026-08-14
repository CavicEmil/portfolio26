import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import previewdummy from '../assets/previewdummy.png';
import ProjektDetail from '../components/ProjektDetail';


export default function Projekter() {

    const projects = [
        { id: 'kunsthalmuseum', title: 'Kunsthal Museum', tags: ['Branding', 'Webdesign', 'Development'] , preview: previewdummy },
        { id: 'blaasol', title: 'Blå Sol Festival', tags: ['Forskning', 'UX/UI Design', 'Development'], preview: previewdummy },
        { id: 'spielcafeenadmin', title: 'Spielcafeen Adminpanel', tags: ['Logonsikkerhed', 'CRUD', 'Development'], preview: previewdummy }
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
            onComplete: () => gsap.set(previewRefs.current[id], { left: '-50vw' }), // reset off-left, so it always enters from the left next time
        });
    };


    useEffect(() => {
        if (!selectedId) return;

        const handleWheel = (e) => {
            e.preventDefault();
            scrollAreaRef.current.scrollLeft += e.deltaY;
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', handleWheel);
        };
    }, [selectedId]);

    return (
        <div className="bg-mainbg py-[30vh] min-h-[120vh] w-full overflow-hidden "> 
            <div className='flex flex-col items-start pl-36 relative'>
                <h2 id="projekter-title" className='font-bodoni font-semibold text-[48px] text-offwhite pt-[10vh]'>udvalgte projekter</h2>
                <div ref={scrollAreaRef} className='flex flex-col items-start gap-6 pt-18  font-epic text-[48px] text-white  '>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="relative w-full h-[13vh] cursor-pointer py-6"
                            onMouseEnter={() => handleEnter(project.id)}
                            onMouseLeave={() => handleLeave(project.id)}
                        >
                            <button
                                data-cursor="se mere"
                                onClick={() => setSelectedId(project.id)}
                                className="relative block text-left overflow-hidden h-[52px]"
                                
                            >
                                <span
                                    ref={(el) => (defaultTitleRefs.current[project.id] = el)}
                                    className="block font-epic text-[48px] text-white uppercase leading-none"
                                >
                                    {project.title}
                                </span>
                                <span
                                    ref={(el) => (hoverTitleRefs.current[project.id] = el)}
                                    className="block font-bodoni text-[48px] text-white uppercase pt-[2px] absolute top-full left-0"
                                >
                                    {project.title}
                                </span>
                            </button>
                            <div
                                ref={(el) => (tagsRefs.current[project.id] = el)}
                                className="font-body text-[28px] text-white "
                                >
                                {project.tags.join(' | ')}
                            </div>
                            <img
                                ref={(el) => (previewRefs.current[project.id] = el)}
                                src={project.preview}
                                alt={project.title}
                                style={{ left: '-50vw' }}
                                className="absolute top-1/2 -translate-y-1/2 w-[30vw] pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
                {selectedId && (
                    <ProjektDetail projectId={selectedId} onClose={() => setSelectedId(null)} scrollAreaRef={scrollAreaRef} />
                )}
            </div>
        </div>
    );
};