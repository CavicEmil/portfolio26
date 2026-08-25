const SHARED_HUMAN_TEXT =
  'Som mennesker sætter vi pris på meningsfuld kommunikation, formidlet gennem følelser og historier. Hvis du ansætter mig, slipper du derfor for fiksfakseri med buzzwords og tom snak. I stedet får du bare ærlige vare, design med karakter og sjæl og effektiv kode, der virker. Lyder det godt? ';

const HUMAN_OPTIONS = [
  { label: 'Absolut!', action: 'scrollKontakt' },
  { label: 'Jeg er skeptisk nok', action: 'goto', target: 'waltz' },
];

export const dialogue = {
  intro: {
    segments: [
      { type: 'text', value: 'Hej! Jeg hedder Emil. Jeg læser Multimediedesign med speciale i UX/UI-design og webudvikling.\nDu skal bare ansætte mig! Overbevist? ' },
    ],
    options: [
      { label: 'Vi er et perfekt match!', action: 'scrollKontakt' },
      { label: 'Ikke helt endnu', action: 'goto', target: 'doubt' },
    ],
  },

  doubt: {
    segments: [
      { type: 'text', value: '\nFair nok! Jeg skaber design, der er skræddersyet til kundernes behov. I vores uddannelse har vi lært, at kunder er mennesker, ikke bare tal i en statistik. Giver det mening? ' },
    ],
    options: [
      { label: 'Jaså', action: 'goto', target: 'human-a' },
      { label: 'Ærlig? Næh', action: 'goto', target: 'human-b' },
    ],
  },

  'human-a': {
    segments: [
      { type: 'text', value: '\nDet er superspænnende, vel? ' + SHARED_HUMAN_TEXT },
    ],
    options: HUMAN_OPTIONS,
  },

  'human-b': {
    segments: [
      { type: 'text', value: '\nLad os kig på emnet fra denne vinkel: ' + SHARED_HUMAN_TEXT },
    ],
    options: HUMAN_OPTIONS,
  },

  waltz: {
    segments: [
      { type: 'text', value: '\nJeg farstår, men jeg lover vi skal nok nå det! Mine kollegaer siger, at jeg minder dem om Christoph Waltz.' },
      { type: 'component', value: 'waltz' },
      { type: 'text', value: ' Og ja, jeg må indrømme, at jeg både ser ud og lyder som min landsmand, og naturligvis deler jeg hans wienercharme. Men her er nogle ting, min landsmand ikke kan:' },
      { type: 'component', value: 'marquee' },
      { type: 'text', value: 'Lyder det godt?' },
    ],
    options: [
      { label: 'JA MAND', action: 'scrollKontakt', allCaps: true },
      { label: 'Vis mig, du kan holde til sidst!', action: 'scrollToStil' },
    ],
  },
};

