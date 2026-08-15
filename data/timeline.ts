import type { TimelineEvent } from '@/lib/data/types';
export const timeline: TimelineEvent[] = [
  { year: 1947, label: 'THE BEGINNING', title: 'Independence', text: 'A new republic would have to build much of the scientific infrastructure it needed from the ground up.', category: 'FOUNDATION' },
  { year: 1962, label: 'INCOSPAR', title: 'Institution', text: "India's early space programme takes shape with INCOSPAR.", category: 'FOUNDATION' },
  { year: 1963, label: 'THUMBA', title: 'Sounding rockets', text: 'The sounding-rocket era begins at Thumba, establishing the practical laboratory for the programme that follows.', category: 'FOUNDATION' },
  { year: 1969, label: 'ISRO', title: 'Institution', text: "ISRO is established, bringing India's space effort into a national institutional framework.", category: 'FOUNDATION' },
  { year: 1975, label: 'ARYABHATA', title: 'First satellite', text: "India's first satellite reaches orbit — the beginning of the satellite era.", category: 'SATELLITE' },
  { year: 1980, label: 'ROHINI', title: 'Launch capability', text: 'SLV-3 successfully places Rohini RS-1 into orbit, establishing indigenous orbital launch capability.', category: 'LAUNCH' },
  { year: 1981, label: 'APPLE', title: 'Communication', text: 'An experimental communication satellite proves that space infrastructure can become national infrastructure.', category: 'COMMUNICATION' },
  { year: 1988, label: 'IRS-1A', title: 'Earth observation', text: "India's operational remote-sensing lineage begins.", category: 'EARTH' },
  { year: 1994, label: 'PSLV', title: 'Workhorse', text: "PSLV begins its long ascent as India's dependable polar-launch workhorse.", category: 'LAUNCH' },
  { year: 2001, label: 'GSLV', title: 'Heavy lift', text: 'The GSLV era opens with an indigenous path toward geosynchronous launch capability.', category: 'LAUNCH' },
  { year: 2008, label: 'CHANDRAYAAN-1', title: 'Moon', text: 'India turns its instruments toward the Moon.', category: 'LUNAR' },
  { year: 2013, label: 'MARS ORBITER', title: 'Mars', text: 'India crosses the boundary between Earth-orbiting missions and interplanetary exploration.', category: 'PLANETARY' },
  { year: 2015, label: 'ASTROSAT', title: 'Astronomy', text: 'A multi-wavelength observatory puts Indian space science into a new regime.', category: 'SCIENCE' },
  { year: 2017, label: 'PSLV-C37', title: 'Scale', text: 'PSLV launches 104 satellites in a single mission, a defining commercial milestone.', category: 'LAUNCH' },
  { year: 2019, label: 'CHANDRAYAAN-2', title: 'Moon', text: 'A more ambitious lunar mission expands the scientific and engineering challenge.', category: 'LUNAR' },
  { year: 2023, label: 'CHANDRAYAAN-3', title: 'Landing', text: 'India demonstrates a successful soft landing and rover operations on the Moon.', category: 'LUNAR' },
  { year: 2023, label: 'ADITYA-L1', title: 'Sun', text: 'A dedicated solar observatory begins its journey to the Sun–Earth L1 region.', category: 'SOLAR' },
  { year: 2024, label: 'SPACEDX', title: 'Docking', text: 'Rendezvous and docking move from concept toward demonstrated capability.', category: 'TECH' },
  { year: 2025, label: 'NISAR', title: 'Earth', text: 'A major NASA-ISRO Earth-observation mission enters orbit.', category: 'EARTH' },
  { year: 2026, label: 'EOS-N1', title: '2026', text: 'The latest launch record shows that the journey still includes uncertainty, failure and persistence.', category: 'PRESENT' },
  { year: 2047, label: 'THE HORIZON', title: 'Future', text: 'A century after independence, the next chapter remains unwritten.', category: 'FUTURE' }
];
