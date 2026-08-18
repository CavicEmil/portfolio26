import { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { projects } from '../data/projects';
import close from '../assets/close.svg'
import khhero from '../assets/proj1/kh-hero.png';
import khtablet1 from '../assets/proj1/kh-tablet.png';
import khtablet2 from '../assets/proj1/kh-tablet2.png';
import khmobile1 from '../assets/proj1/mobile1.png';
import khmobile2 from '../assets/proj1/mobile2.png';
import khmobile3 from '../assets/proj1/mobile3.png';
import khmobile4 from '../assets/proj1/mobile4.png';
import khmobile5 from '../assets/proj1/mobile5.png';
import khmobile6 from '../assets/proj1/mobile6.png';
import khmobile7 from '../assets/proj1/mobile7.png';
import khmobile8 from '../assets/proj1/mobile8.png';
import bsmobile1 from '../assets/proj2/mobile1.png';
import bsmobile2 from '../assets/proj2/mobile2.png';
import bsmobile3 from '../assets/proj2/mobile3.png';
import bsmobile4 from '../assets/proj2/mobile4.png';
import bsmobile5 from '../assets/proj2/mobile5.png';
import bsmobile6 from '../assets/proj2/mobile6.png';
import bsmobile7 from '../assets/proj2/mobile7.png';
import scvideo from '../assets/proj3/media1.mp4';
import MediaStack from './MediaStack';




export default function ProjektDetail({ projectId, onClose }) {

    const projdata = [
        {
            id: 'kunsthalmuseum',
            section1: {
                media:[khhero,khtablet1,khtablet2],
                text:'Desk research og interviews gjorde det klart, at museet mangler en tydelig identitet. Derfor var et rebranding nødvendigt. Vi havde til formål at skabe en visuel identitet for kunsthallen for at etablere den som en kunstinstitution, der byder alle velkommen.'
            },
            section2: {
                media:[khmobile1, khmobile2, khmobile3, khmobile4, khmobile5, khmobile6, khmobile7, khmobile8],
                text:'Kunsthallens mobile app supplerer udstillingerne ved at lade besøgende scanne en QR-kode for at se et interaktivt kort over udstillingen samt få baggrundsinformation om hver installation og kunstneren.'
            },
            section3: {
                text:'Web-applikationen bruger Node.js til at køre en server i baggrunden, som gemmer data ved hjælp af SQLite. Frontenden henter data via API-middleware. Tjek GitHub-repositoriet for et detaljeret kig under motorhjelmen.',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/french-museum'}]
            }
        },
        {
            id: 'blaasol',
            section1: {
                graph:{title:'Discovery', points:['Market research','Netnography','Client interviews','Target group interviews'], conclusion:'Problem Statement:Hvordan kan vi gøre det både nemt og attraktivt for unge voksne (18+) at tage det første skridt mod at blive frivillige ved BLÅ SOL-festivalen?'},
                text:'Desk research og interviews gjorde det klart, at museet mangler en tydelig identitet. Derfor var et rebranding nødvendigt. Vi havde til formål at skabe en visuel identitet for kunsthallen for at etablere den som en kunstinstitution, der byder alle velkommen.'
            },
            section2: {
                media:[bsmobile1, bsmobile2, bsmobile3, bsmobile4, bsmobile5, bsmobile6, bsmobile7],
                text:'Med den mobile app til frivillige lykkedes det os at løse et kerneproblem for BLÅ SOL-festivalen, samtidig med at vi optimerede brugerflowet gennem validering af brugbarhedstests.'
            },
            section3: {
                text:'Tjek GitHub-repositoriet for et detaljeret kig på koden eller prøv den live version selv.',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/blaasol'},{label:'live view til mobilvisning', link:'https://cavicemil.github.io/blaasol/'}]
            }

        },
        {
            id: 'spielcafeenadmin',
            section1: {
                text:'Spielcafeen admin-projekt simulerer en web-app med fuld CRUD-funktionalitet samt adgangskodehash og salt-kryptering. Se videoen for en kort præsentation af, hvordan det virker!'
            },
            section2: {
                media:[scvideo],
            },
            section3: {
                text:'Tjek GitHub-repositoriet for et detaljeret kig på koden ',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/spilcafeenadmin'}]
            }
        },
    ]

    function VideoPlayer({ src }) {
        return (
            <video controls preload="metadata" playsInline className="w-[40vw] h-[70vh] object-cover rounded-lg bg-black flex-shrink-0">
            <source src={src} />
            Din browser understøtter ikke videoafspilning.
            </video>
        );
    }

    function isVideoFile(src) {
        return /\.(mp4|webm|mov)$/i.test(src);
    }

    function Section({ section, panelRef }) {
        return (
            <div className="w-[90vw] h-full flex-shrink-0 flex items-center gap-16 px-24">
            {section.media && section.media.length > 1 && <MediaStack media={section.media} panelRef={panelRef} />}

            {section.media && section.media.length === 1 && (
                isVideoFile(section.media[0])
                ? <VideoPlayer src={section.media[0]} />
                : <img src={section.media[0]} className="w-[40vw] h-[70vh] object-cover rounded-lg flex-shrink-0" />
            )}

            {section.graph && (
                <div className="w-[40vw] flex-shrink-0 font-body text-white">
                <h3 className="font-bodoni text-[28px] text-offwhite mb-4">{section.graph.title}</h3>
                <ul className="mb-6">
                    {section.graph.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <p>{section.graph.conclusion}</p>
                </div>
            )}

            <div className="flex-1 font-body text-white">
                <p className="text-[20px] leading-relaxed">{section.text}</p>
                {section.links && (
                <div className="flex flex-col gap-2 mt-6">
                    {section.links.map((l) => (
                        <a
                            key={l.link}
                            href={l.link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bodoni text-offwhite text-[16px] hover:text-accent-red transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
                )}
            </div>
            </div>
        );
        }

    const panelRef = useRef(null);
    const tlRef = useRef(null);
    const project = projects.find((p) => p.id === projectId);
    const detail = projdata.find((p) => p.id === projectId);
    const sections = [detail.section1, detail.section2, detail.section3];

    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        tlRef.current = gsap.timeline().to(panelRef.current, {
            motionPath: {
                path: [{ x: '30vw', y: '-70vh' }, { x: '5vw', y: '-15vh' }, { x: 0, y: 0 }],
                curviness: 1.5,
            },
            duration: 0.8,
            ease: 'power2.out',
        });
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

    useEffect(() => {
        const handleWheel = (e) => {
        e.preventDefault();
        panelRef.current.scrollLeft += e.deltaY;
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
        document.body.style.overflow = '';
        window.removeEventListener('wheel', handleWheel);
        };
    }, []);
  
    return (
        <>
            <div
                ref={panelRef}
                className="fixed top-0 right-0 h-screen w-[93vw] bg-mainbg z-40 overflow-x-auto overflow-y-hidden"
            >
                <div className="flex flex-row h-full">
                {sections.map((section, i) => (
                    <Section key={i} section={section} panelRef={panelRef} />
                ))}
                </div>
            </div>

            <div className="fixed top-12 z-50 pointer-events-none" style={{ left: 'calc(7vw + 3rem)' }}>
                <h2 className="font-bodoni text-[48px] text-offwhite uppercase leading-none">{project.title}</h2>
                <p className="font-body text-[28px] text-white mt-2">{project.tags.join(' | ')}</p>
            </div>

            <button
                onClick={handleClose}
                aria-label="Luk"
                className="fixed top-6 z-50 w-6 h-6 bg-offwhite hover:opacity-70 transition-opacity"
                style={{ left: 'calc(7vw + 1.5rem)', WebkitMaskImage: `url(${close})`, maskImage: `url(${close})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'contain', maskSize: 'contain' }}
            />
        </>
    )
}