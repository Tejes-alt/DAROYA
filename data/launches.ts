import type { Launch } from '@/lib/data/types';
import { sources } from '@/data/sources';

export const launches: Launch[] = [
  { id: 'l105', year: 2026, date: '2026-01-12', vehicle: 'PSLV-C62 / EOS-N1 Mission', payload: 'ANVESHA (EOS-N1)', outcome: 'Unsuccessful', note: 'ISRO launch record: mission not accomplished.', source: sources.launchMissions },
  { id: 'l104', year: 2025, date: '2025-12-24', vehicle: 'LVM3-M6 / BlueBird Block-2 Mission', payload: 'BlueBird Block 2', outcome: 'Success', note: 'Commercial heavy-lift mission.', source: sources.launchMissions },
  { id: 'l103', year: 2025, date: '2025-11-02', vehicle: 'LVM3-M5 / CMS-03 Mission', payload: 'CMS-03', outcome: 'Success', note: 'Communications satellite launch.', source: sources.launchMissions },
  { id: 'l102', year: 2025, date: '2025-07-30', vehicle: 'GSLV-F16 / NISAR Mission', payload: 'NISAR', outcome: 'Success', note: 'NASA-ISRO Earth-observation mission.', source: sources.launchMissions },
  { id: 'l101', year: 2025, date: '2025-05-18', vehicle: 'PSLV-C61 / EOS-09 Mission', payload: 'EOS-09', outcome: 'Unsuccessful', note: 'ISRO records the mission as not accomplished.', source: sources.launchMissions },
  { id: 'l100', year: 2025, date: '2025-01-29', vehicle: 'GSLV-F15 / NVS-02 Mission', payload: 'NVS-02', outcome: 'Success', note: 'Mission achieved orbit insertion but NVS-02 was later recorded as not operational.', source: sources.launchMissions },
  { id: 'l099', year: 2024, date: '2024-12-30', vehicle: 'PSLV-C60 / SpaDeX Mission', payload: 'SpaDeX-A, SpaDeX-B, POEM-4', outcome: 'Success', note: 'Technology demonstration mission.', source: sources.launchMissions },
  { id: 'l098', year: 2024, date: '2024-12-05', vehicle: 'PSLV-C59 / Proba-3 Mission', payload: 'Proba-3', outcome: 'Success', note: 'ESA solar-coronagraph formation-flying mission.', source: sources.launchMissions },
  { id: 'l097', year: 2024, date: '2024-08-16', vehicle: 'SSLV-D3 / EOS-08 Mission', payload: 'EOS-08', outcome: 'Success', note: 'Earth observation and technology demonstration.', source: sources.launchMissions },
  { id: 'l096', year: 2024, date: '2024-02-17', vehicle: 'GSLV-F14 / INSAT-3DS Mission', payload: 'INSAT-3DS', outcome: 'Success', note: 'Meteorological satellite.', source: sources.launchMissions },
  { id: 'l095', year: 2024, date: '2024-01-01', vehicle: 'PSLV-C58 / XPoSat Mission', payload: 'XPoSat', outcome: 'Success', note: 'X-ray polarimetry astronomy mission.', source: sources.launchMissions },
  { id: 'l094', year: 2023, date: '2023-09-02', vehicle: 'PSLV-C57 / Aditya-L1 Mission', payload: 'Aditya-L1', outcome: 'Success', note: 'First dedicated Indian solar observatory.', source: sources.launchMissions },
  { id: 'l092', year: 2023, date: '2023-07-14', vehicle: 'LVM3-M4 / Chandrayaan-3 Mission', payload: 'Chandrayaan-3', outcome: 'Success', note: 'Lunar soft-landing mission.', source: sources.launchMissions },
  { id: 'l091', year: 2023, date: '2023-05-29', vehicle: 'GSLV-F12 / NVS-01 Mission', payload: 'NVS-01', outcome: 'Success', note: 'Next-generation NavIC spacecraft.', source: sources.launchMissions },
  { id: 'l088', year: 2023, date: '2023-02-10', vehicle: 'SSLV-D2 / EOS-07 Mission', payload: 'EOS-07', outcome: 'Success', note: 'SSLV development flight.', source: sources.launchMissions },
  { id: 'l086', year: 2022, date: '2022-10-23', vehicle: 'LVM3-M2 / OneWeb India-1 Mission', payload: 'OneWeb Gen-1', outcome: 'Success', note: 'Commercial broadband constellation launch.', source: sources.launchMissions },
  { id: 'l083', year: 2022, date: '2022-02-14', vehicle: 'PSLV-C52 / EOS-04 Mission', payload: 'EOS-04', outcome: 'Success', note: 'Radar earth observation mission.', source: sources.launchMissions },
  { id: 'l082', year: 2021, date: '2021-08-12', vehicle: 'GSLV-F10 / EOS-03 Mission', payload: 'EOS-03', outcome: 'Unsuccessful', note: 'ISRO records the mission as unsuccessful.', source: sources.launchMissions },
  { id: 'l079', year: 2019, date: '2019-11-27', vehicle: 'PSLV-C47 / Cartosat-3 Mission', payload: 'Cartosat-3 and rideshares', outcome: 'Success', note: 'High-resolution Earth observation mission.', source: sources.launchMissions },
  { id: 'l078', year: 2019, date: '2019-07-22', vehicle: 'GSLV Mk III M1 / Chandrayaan-2 Mission', payload: 'Chandrayaan-2', outcome: 'Success', note: 'Lunar mission with orbiter, lander and rover.', source: sources.launchMissions },
  { id: 'l070', year: 2015, date: '2015-09-28', vehicle: 'PSLV-C30 / AstroSat Mission', payload: 'AstroSat', outcome: 'Success', note: 'Dedicated Indian astronomy mission.', source: sources.launchMissions },
  { id: 'l062', year: 2013, date: '2013-11-05', vehicle: 'PSLV-C25 / Mars Orbiter Mission', payload: 'Mars Orbiter Mission', outcome: 'Success', note: "India's first interplanetary launch.", source: sources.launchMissions },
  { id: 'l060', year: 2008, date: '2008-10-22', vehicle: 'PSLV-C11 / Chandrayaan-1 Mission', payload: 'Chandrayaan-1', outcome: 'Success', note: "India's first lunar launch.", source: sources.launchMissions },
  { id: 'l055', year: 2005, date: '2005-05-05', vehicle: 'PSLV-C6 / Cartosat-1 Mission', payload: 'Cartosat-1', outcome: 'Success', note: 'High-resolution stereo Earth observation.', source: sources.launchMissions }
];
