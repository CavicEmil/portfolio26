import { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { projects } from '../data/projects';
import close from '../assets/close.svg'
import khhero from '../assets/proj1/kh-hero.png';
import khtablet1 from '../assets/proj1/kh-tablet.png';
import khtablet2 from '../assets/proj1/kh-tablet2.png';
import khmobile2 from '../assets/proj1/mobile2.png';
import khmobile3 from '../assets/proj1/mobile3.png';
import khmobile4 from '../assets/proj1/mobile4.png';
import khmobile5 from '../assets/proj1/mobile5.png';
import khmobile6 from '../assets/proj1/mobile6.png';
import khmobile7 from '../assets/proj1/mobile7.png';
import bsmobile1 from '../assets/proj2/mobile1.png';
import bsmobile2 from '../assets/proj2/mobile2.png';
import bsmobile3 from '../assets/proj2/mobile3.png';
import bsmobile4 from '../assets/proj2/mobile4.png';
import bsmobile5 from '../assets/proj2/mobile5.png';
import bsmobile6 from '../assets/proj2/mobile6.png';
import scvideo from '../assets/proj3/media1.mp4';
import MediaStack from './MediaStack';




export default function ProjektDetail({ projectId, onClose, onNavigateKontakt }) {

    const projdata = [
        {
            id: 'kunsthalmuseum',
            sections: [{
                media:[khhero,khtablet1,khtablet2],
                text:'Desk research og interviews gjorde det klart, at museet mangler en tydelig identitet. Derfor var et rebranding nødvendigt. Vi havde til formål at skabe en visuel identitet for kunsthallen for at etablere den som en kunstinstitution, der byder alle velkommen.'
            },
            {
                media:[khmobile2, khmobile3, khmobile4, khmobile5, khmobile6, khmobile7],
                text:'Kunsthallens mobile app supplerer udstillingerne ved at lade besøgende scanne en QR-kode for at se et interaktivt kort over udstillingen samt få baggrundsinformation om hver installation og kunstneren.'
            },
            {
                learningsdesign:'At turde træffe store beslutninger når de er nødvendige. At oversætte field research resultater til hvad både klienten og deres kunder har brug for, og hvordan dette kan gøres for at opnå en tiflredstillende resultat for begge parter.',
                learningscode:'At skabe effektive eksempler på webapp funktionaliteter, fx hvordan frontend kommunikerer med en API til en Node.js server og at bruge SQLite til at hente præcis den data der er brug for.',
            },
            {
                text:'Web-applikationen bruger Node.js til at køre en server i baggrunden, som gemmer data ved hjælp af SQLite. Frontenden henter data via API-middleware. Tjek GitHub-repositoriet for et detaljeret kig under motorhjelmen.',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/french-museum'}]
            }]
        },
        {
            id: 'blaasol',
            sections: [{
                graph:{title:'Discovery', points:['Market research','Netnography','Client interviews','Target group interviews'], conclusion:'Problem Statement: Hvordan kan vi gøre det både nemt og attraktivt for unge voksne (18+) at tage det første skridt mod at blive frivillige ved BLÅ SOL-festivalen?'},
                text:'Gennem markedsundersøgelse, netnografi, interviews med klienten og interviews med målgruppen var vi i stand til at destillere en reel udfordring til et problemstatement og bygge projektet derfra.'
            },
            {
                media:[bsmobile1, bsmobile2, bsmobile3, bsmobile4, bsmobile5, bsmobile6],
                text:'Med den mobile app til frivillige lykkedes det os at løse et kerneproblem for BLÅ SOL-festivalen, samtidig med at vi optimerede brugerflowet gennem validering af brugbarhedstests.'
            },
            {
                learningsdesign:'At identificere mulige problemstillinger og vurdere, hvilke det giver mening at løse. At forstå, hvad det betyder at tilpasse UX design præcist til målgruppen og at teste denne grundigt gennem usability tests.',
                learningscode:'At oversætte udfordrendee designkrav fra UX/UI design prototypen til en funktionerede frontend til mobilbrug.',
            },
            {
                text:'Tjek GitHub-repositoriet for et detaljeret kig på koden eller prøv den live version selv.',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/blaasol'},{label:'live view til mobilvisning', link:'https://cavicemil.github.io/blaasol/'}]
            }]

        },
        {
            id: 'spielcafeenadmin',
            sections: [
                {
                media:[scvideo],
                text:'Spielcafeen admin-projekt simulerer en web-app med fuld CRUD-funktionalitet samt adgangskodehash og salt-kryptering. Se videoen for en kort præsentation af, hvordan det virker!'
                },
                {
                    learningsdesign:'At gøre det nemt for admin brugeren at klare opgaverne hurtigt og effektivt.',
                    learningscode:'At arbejde med CRUD funktionaliter og JSON: at gør det muligt at vise data fra JSON på skærmen på en måde, der tillader oprettelse, redigering og sletning af data på frontenden og faktisk at manipuelre data i JSON filen. Det var også spændende at implementere en login-funktion med hash og salt kryptering.',
                },
                {
                text:'Tjek GitHub-repositoriet for et detaljeret kig på koden ',
                links:[{label:'github repositoriet', link:'https://github.com/CavicEmil/spilcafeenadmin'}]
                }
            ]
        },
    ]

    function VideoPlayer({ src }) {
        return (
            <video autoPlay muted loop playsInline controls preload="metadata" className="w-[50vw] h-auto object-cover rounded-lg bg-black flex-shrink-0">
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
            <div className="min-w-[40vw] h-full flex-shrink-0 flex items-center gap-16 px-24">
            {section.media && section.media.length > 1 && <MediaStack media={section.media} panelRef={panelRef} />}

            {section.media && section.media.length === 1 && (
                isVideoFile(section.media[0])
                ? <VideoPlayer src={section.media[0]} />
                : <img src={section.media[0]} className="w-[40vw] h-auto pt-12 object-cover rounded-lg flex-shrink-0" />
            )}

            {section.graph && (
                <div className="w-[40vw] flex-shrink-0 font-body text-white">
                <h3 className="font-bodoni text-[28px] text-offwhite mb-4 border-b border-offwhite">{section.graph.title}</h3>
                <div className='flex flex-row divide-x divide-offwhite gap-12'>
                    <ul className="mb-6 px-12">
                        {section.graph.points.map((p) => <li key={p} className='w-[10vw]'>{p}</li>)}
                    </ul>
                    <p>{section.graph.conclusion}</p>
                </div>
                </div>
            )}
            {section.learningscode && (
                <div className="max-w-[40vw] w-fit flex-shrink-0 font-body text-white space-y-8">
                    <h3 className="font-bodoni text-[28px] text-right pr-12 text-offwhite mb-4 border-b border-offwhite ">Lærdomme</h3>
                    <p className="text-[20px] max-w-[30vw] leading-relaxed">{section.learningsdesign}</p>
                    <p className="text-[20px] max-w-[30vw] leading-relaxed">{section.learningscode}</p>
                    <p className="text-[20px] max-w-[30vw] leading-relaxed">Hvis du har interesse i at vide mere om projektet, processen og min rolle i det, så lad os bare snakke om det!</p> 
                    <p onClick={ () => {onNavigateKontakt(); handleClose();}} className="pl-18 hover:font-bodoni text-offwhite text-[20px] cursor-pointer hover:text-accent-red transition-colors"> 
                        Kontakt mig, så mødes vi!
                    </p>
                </div>
            )}


            <div className="flex-1 font-body text-white">
                <p className="text-[20px] max-w-[30vw] leading-relaxed">{section.text}</p>
                {section.links && (
                <div className="flex flex-col gap-2 mt-6">
                    {section.links.map((l) => (
                        <a
                            key={l.link}
                            href={l.link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bodoni text-offwhite text-[22px] hover:text-accent-red transition-colors"
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
    const trackRef = useRef(null);

    const project = projects.find((p) => p.id === projectId);
    const detail = projdata.find((p) => p.id === projectId);
    const sections = detail.sections;


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh()
            gsap.set(panelRef.current, { opacity: 0 });
            tlRef.current = gsap.timeline().to(panelRef.current, {
                opacity: 1,
                duration: 0.5,
                motionPath: {
                    path: [{ x: '-200vw', y: '-200vh' }, { x: '-90vw', y: '-75vh' }, { x: 0, y: 0 }],
                    curviness: -1.5,
                },
                duration: 0.8,
                ease: 'power2.out',
            });
            }, panelRef);
            return () => ctx.revert();
    }, []);

   /*  const handleClose = () => {
        tlRef.current.eventCallback('onReverseComplete', () => {
            gsap.set(panelRef.current, { autoAlpha: 0 });
            onClose();
        });
        tlRef.current.reverse();
    }; */
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
        const el = panelRef.current;
        const handleWheel = (e) => {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };
        document.body.style.overflow = 'hidden';
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            document.body.style.overflow = '';
            el.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useEffect(() => {
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

  
    return (
        <>
                        
            <div
                ref={panelRef}
                className="fixed top-0 right-0 h-[90vh] w-[93vw] bg-portfoliobg z-40 overflow-x-auto overflow-y-hidden"
            >                
                <div ref={trackRef} className="flex flex-row h-full">
                {sections.map((section, i) => (
                    <Section key={i} section={section} panelRef={panelRef} />
                ))}
                </div>
            </div>


            <div className="fixed top-0 z-50 pointer-events-none" style={{ left: 'calc(7vw + 3rem)' }}>
                <h2 className="font-bodoni text-[48px] text-offwhite uppercase leading-none pt-12">{project.title}</h2>
                <p className="font-body text-[28px] text-white mt-2">{project.tags.join(' | ')}</p>
           
            </div>           

            <img src={close}
                onClick={handleClose}
                aria-label="Luk"
                className="fixed z-[99] w-12 h-12 cursor-pointer"
                style={{ left: 'calc(3vw + 1.5rem)', top: 'calc(4vh + .5rem)' }}
            />
        </>
    )
}