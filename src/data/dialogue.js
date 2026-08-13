const SHARED_HUMAN_TEXT =
  'Som mennesker sætter de pris på meningsfuld kommunikation, formidlet gennem følelser og historier. Derfor får du, når du ansætter mig, ingen fiksfakseri, der pyntes op med buzzwords og tomme fraser. I stedet får du design med karakter og sjæl, dybt menneskeligt. Lyder det godt? ';

const HUMAN_OPTIONS = [
  { label: 'Absolut!', action: 'goto', target: 'scrollKontakt' },
  { label: 'Ikke helt', action: 'goto', target: 'waltz' },
];

export const dialogue = {
  intro: {
    segments: [
      { type: 'text', value: 'Hej! Jeg hedder Emil. Jeg læser Multimediedesign med speciale i UX/UI-design og webudvikling.\nDu bør absolut ansætte mig! Overbevist? ' },
    ],
    options: [
      { label: 'Vi er et perfekt match!', action: 'scrollKontakt' },
      { label: 'Ikke helt endnu', action: 'goto', target: 'doubt' },
    ],
  },

  doubt: {
    segments: [
      { type: 'text', value: 'Fair nok! Jeg skaber design, der er skræddersyet til kundernes behov. Under vores uddannelse har vi lært, at kunder er mennesker, ikke bare tal i en statistik. Chokerende, ikke? ' },
    ],
    options: [
      { label: 'Jaså', action: 'goto', target: 'human-a' },
      { label: 'Ærlig? Næh', action: 'goto', target: 'human-b' },
    ],
  },

  'human-a': {
    segments: [
      { type: 'text', value: 'Præcis! Så, ' + SHARED_HUMAN_TEXT },
    ],
    options: HUMAN_OPTIONS,
  },

  'human-b': {
    segments: [
      { type: 'text', value: 'Okay, men hvis man ser det fra denne vinkel: ' + SHARED_HUMAN_TEXT },
    ],
    options: HUMAN_OPTIONS,
  },

  waltz: {
    segments: [
      { type: 'text', value: 'Ingen grund til at bekymre sig – vi kommer derhen!\nMine kollegaer siger, at jeg minder dem om Christoph Waltz.' },
      { type: 'component', value: 'waltz' },
      { type: 'text', value: ' Og ja, jeg må indrømme, at jeg både ser ud og lyder som min landsmand, og naturligvis deler jeg hans wienercharme. Men her er nogle ting, min landsmand ikke kan:' },
      { type: 'component', value: 'marquee' },
      { type: 'text', value: 'Lyder det godt?' },
    ],
    options: [
      { label: 'FOR HELVEDE JA', action: 'scrollKontakt', allCaps: true },
      { label: 'Vis mig, du kan holde til sidst!', action: 'scrollToStil' },
    ],
  },
};

