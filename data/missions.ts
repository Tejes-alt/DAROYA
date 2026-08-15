import type { Mission } from '@/lib/data/types';
import { sources } from '@/data/sources';

export const missions: Mission[] = [
  { id: 'chandrayaan-1', name: 'Chandrayaan-1', year: 2008, destination: 'Moon', launcher: 'PSLV-C11', status: 'Ended', summary: "India's first lunar mission, focused on mapping and studying the Moon.", source: sources.spacecraft },
  { id: 'mars-orbiter', name: 'Mars Orbiter Mission', year: 2013, destination: 'Mars', launcher: 'PSLV-C25', status: 'Ended', summary: "India's first interplanetary mission and a demonstration of deep-space mission capability.", source: sources.spacecraft },
  { id: 'astrosat', name: 'AstroSat', year: 2015, destination: 'Low Earth Orbit', launcher: 'PSLV-C30', status: 'Operational', summary: 'A multi-wavelength space observatory spanning X-ray, ultraviolet and optical astronomy.', source: sources.spacecraft },
  { id: 'chandrayaan-2', name: 'Chandrayaan-2', year: 2019, destination: 'Moon', launcher: 'GSLV Mk III M1', status: 'Operational', summary: 'Orbiter-led lunar science mission with lander and rover elements.', source: sources.spacecraft },
  { id: 'chandrayaan-3', name: 'Chandrayaan-3', year: 2023, destination: 'Moon', launcher: 'LVM3-M4', status: 'Mission complete', summary: 'A lunar landing and rover technology demonstration that achieved soft landing.', source: sources.spacecraft },
  { id: 'aditya-l1', name: 'Aditya-L1', year: 2023, destination: 'Sun–Earth L1', launcher: 'PSLV-C57', status: 'Operational', summary: 'A dedicated solar observatory studying the Sun from the L1 region.', source: sources.spacecraft },
  { id: 'xposat', name: 'XPoSat', year: 2024, destination: 'Low Earth Orbit', launcher: 'PSLV-C58', status: 'Operational', summary: 'A dedicated astronomy mission for X-ray polarimetry.', source: sources.spacecraft },
  { id: 'spadex', name: 'SpaDeX', year: 2024, destination: 'Low Earth Orbit', launcher: 'PSLV-C60', status: 'Technology demonstration', summary: 'Rendezvous, proximity operations and docking technology demonstration.', source: sources.spacecraft },
  { id: 'gaganyaan', name: 'Gaganyaan', year: 2020, destination: 'Low Earth Orbit', launcher: 'Human-rated LVM3', status: 'Under development', summary: "India's human spaceflight programme; future flight milestones must be read against current official status.", source: sources.spacecraft }
];
