import Shandor from '../assets/Shandor.png';
import Bibi from '../assets/Bibi.png';
import Katrina from '../assets/katrina.jpg';
import Julia from '../assets/Julia.jpg';
import Josie from '../assets/Josie.png';

export const testimonials = [
    {
        id: 't1', 
        type:'testimonial',
        name: 'Shandor Andersen Cardoso',
        profilImg: {Shandor},
        linkedin: 'https://www.linkedin.com',
        testimonial: 'Emil lader dyb professionel stolthed præge alt, hvad han foretager sig. At arbejde med ham er struktureret, organiseret og effektivt. Alligevel formår han altid at opretholde en venlig og humoristisk stemning blandt sine kollegaer. Emil stræber efter det bedste i sit arbejde – og det mærkes.',
        ratings: [
            { adjective: 'Teamwork', stars: 5 },
            { adjective: 'Detaljeorienteret', stars: 5 },
            { adjective: 'Meddelelse', stars: 5 },
        ],
    },
        {
        id: 't2', 
        type:'testimonial',
        name: 'Bibiana Tonková',
        profilImg: {Bibi},
        linkedin: 'https://www.linkedin.com',
        testimonial: 'Emil var en af de bedste ledere, jeg har haft glæden af at arbejde med. Han førte holdet konsekvent og effektivt, traf rettidige beslutninger og holdt altid fokus på at opfylde kundens behov. Og han glemte aldrig at krydre det med en god joke for at lette stemningen og få holdet til at tackle udfordringerne med gejst og energi.',
        ratings: [
            { adjective: 'Problemløsning', stars: 5 },
            { adjective: 'Samarbejde', stars: 5 },
            { adjective: 'Tilpasningsevne', stars: 5 },
        ],
    },
    {
        id: 't3', 
        type:'testimonial',
        name: 'Katrina Priess Madsen',
        profilImg: {Katrina},
        linkedin: 'https://www.linkedin.com',
        testimonial: 'At arbejde med Emil var rigtig behageligt. Jeg følte, at han var en tryg person at gå til med spørgsmål og problemer. Han havde altid en god løsning, og jeg vidste, at jeg kunne stole på ham.',
        ratings: [
            { adjective: 'Lærenem', stars: 5 },
            { adjective: 'Innovation', stars: 5 },
            { adjective: 'Analytisk', stars: 5 },
        ],
    },
    {
        id: 't4', 
        type:'testimonial',
        name: 'Julia Maehren Vingren',
        profilImg: {Katrina},
        linkedin: 'https://www.linkedin.com',
        testimonial: 'At have Emil i min gruppe var som at have ro i sindet. Jeg behøvede ikke at bekymre mig om, hvorvidt han udførte sin del, eller om jeg skulle guide ham igennem hver eneste opgave. Emil er ekstremt fokuseret på sine opgaver og arbejder ihærdigt mod målet. Alt i alt, når man arbejder med Emil, ved man, at det aktuelle projekt har stort potentiale!',
        ratings: [
            { adjective: 'Teknisk tankesæt', stars: 5 },
            { adjective: 'Nysgerrighed', stars: 5 },
            { adjective: 'Kundefokuseret', stars: 5 },
        ],
    },
    {
        id: 't5', 
        type:'testimonial',
        name: 'Josephine Scharf',
        profilImg: {Josie},
        linkedin: 'https://www.linkedin.com',
        testimonial: 'Jeg nød at arbejde med Emil, for han er professionel og målorienteret. Han er en fantastisk holdspiller, fordi han kombinerer gruppens interesser med sine egne. Stor kompetence!',
        ratings: [
            { adjective: 'Åbent sind', stars: 5 },
            { adjective: 'Teknisk tankesæt', stars: 5 },
            { adjective: 'Kundefokuseret', stars: 5 },
        ],
    },
    {
        id: 'b1',
        type: 'bonuscontent',
        label: 'Gem alle svar',
        file: '',
    },
    {
        id: 'b2',
        type: 'bonuscontent',
        label: 'Gem min CV',
        file: '',
    }

];