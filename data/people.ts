import { sources } from "@/data/sources";
import type { SourceRef } from "@/lib/data/types";

/**
 * Verified contributors to India's space programme (spec §24).
 * Deliberately a small, high-confidence set — DAROYA's people layer
 * is meant to grow carefully rather than list every name available.
 * No quotes are attributed to anyone; only documented roles and dates.
 */
export type PersonCategory =
  | "Pioneer"
  | "Programme Leader"
  | "Scientist"
  | "Engineer";

export interface Person {
  id: string;
  name: string;
  role: string;
  category: PersonCategory;
  years: string;
  note: string;
  /** Centre ids this person is most associated with. */
  centres?: string[];
  /** Free-text programme/mission names this person is associated with. */
  programmes?: string[];
  source: SourceRef;
}

export const people: Person[] = [
  {
    id: "vikram-sarabhai",
    name: "Vikram Sarabhai",
    role: "Founder of the Indian space programme",
    category: "Pioneer",
    years: "1919–1971",
    note: "Established INCOSPAR in 1962 and the Thumba Equatorial Rocket Launching Station, and is widely regarded as the founder of India's space effort.",
    centres: ["vssc"],
    programmes: ["Foundations"],
    source: sources.timeline,
  },

  {
    id: "homi-bhabha",
    name: "Homi J. Bhabha",
    role: "Founding figure of Indian atomic and space research institutions",
    category: "Pioneer",
    years: "1909–1966",
    note: "Founded the Tata Institute of Fundamental Research and, with Vikram Sarabhai, helped shape the early institutional framework that space research grew from.",
    programmes: ["Foundations"],
    source: sources.timeline,
  },

  {
    id: "satish-dhawan",
    name: "Satish Dhawan",
    role: "Chairman, ISRO (1972–1984)",
    category: "Programme Leader",
    years: "1920–2002",
    note: "Led ISRO through the SLV-3, Rohini, APPLE and early INSAT/IRS era, and the Sriharikota launch range bears his name.",
    centres: ["shar"],
    programmes: ["SLV-3", "APPLE"],
    source: sources.timeline,
  },

  {
    id: "apj-abdul-kalam",
    name: "A. P. J. Abdul Kalam",
    role: "Project Director, SLV-3",
    category: "Engineer",
    years: "1931–2015",
    note: "Led the SLV-3 project that placed Rohini RS-1 in orbit in 1980, India's first satellite launch by an indigenous vehicle; later served as President of India.",
    centres: ["vssc"],
    programmes: ["SLV-3"],
    source: sources.timeline,
  },

  {
    id: "u-r-rao",
    name: "U. R. Rao",
    role: "Chairman, ISRO (1984–1994)",
    category: "Programme Leader",
    years: "1932–2017",
    note: "Led the team that built Aryabhata, India's first satellite, and later oversaw the INSAT and IRS operational satellite era as ISRO Chairman.",
    centres: ["ursc"],
    programmes: ["Aryabhata"],
    source: sources.spacecraft,
  },

  {
    id: "k-radhakrishnan",
    name: "K. Radhakrishnan",
    role: "Chairman, ISRO (2009–2014)",
    category: "Programme Leader",
    years: "b. 1949",
    note: "Oversaw the approval and early development of the Mars Orbiter Mission during his tenure as ISRO Chairman.",
    programmes: ["Mars Orbiter Mission"],
    source: sources.spacecraft,
  },

  {
    id: "k-sivan",
    name: "K. Sivan",
    role: "Chairman, ISRO (2018–2022)",
    category: "Programme Leader",
    years: "b. 1957",
    note: "Led ISRO through the Chandrayaan-2 mission and the early development phase of Gaganyaan.",
    programmes: ["Chandrayaan-2", "Gaganyaan"],
    source: sources.spacecraft,
  },

  {
    id: "s-somanath",
    name: "S. Somanath",
    role: "Chairman, ISRO (2022–2025)",
    category: "Programme Leader",
    years: "b. 1963",
    note: "Led ISRO through the successful Chandrayaan-3 landing in August 2023 and the launch of Aditya-L1.",
    programmes: ["Chandrayaan-3", "Aditya-L1"],
    source: sources.spacecraft,
  },

  {
    id: "v-narayanan",
    name: "V. Narayanan",
    role: "Chairman, ISRO (2025–present)",
    category: "Programme Leader",
    years: "b. 1964",
    note: "A cryogenic-propulsion specialist and former Director of the Liquid Propulsion Systems Centre, he took over as ISRO Chairman in January 2025 and oversees India's current space programme.",
    centres: ["lpsc"],
    programmes: ["Gaganyaan", "SpaDeX"],
    source: sources.spacecraft,
  },

  {
    id: "ritu-karidhal",
    name: "Ritu Karidhal",
    role: "Mission Director",
    category: "Engineer",
    years: "b. 1975",
    note: "Served in senior mission roles including the Mars Orbiter Mission and Chandrayaan-3 programme.",
    centres: ["ursc"],
    programmes: ["Chandrayaan-3", "Mars Orbiter Mission"],
    source: sources.spacecraft,
  },

  {
    id: "muthayya-vanitha",
    name: "Muthayya Vanitha",
    role: "Project Director, Chandrayaan-2",
    category: "Engineer",
    years: "b. 1964",
    note: "Served as Project Director for Chandrayaan-2 and played a leading engineering role in the lunar mission.",
    centres: ["ursc"],
    programmes: ["Chandrayaan-2"],
    source: sources.spacecraft,
  },

  /*
   * SCIENCE & RESEARCH
   */

  {
    id: "sankarasubramanian-k",
    name: "K. Sankarasubramanian",
    role: "Principal Scientist, Aditya-L1",
    category: "Scientist",
    years: "Contemporary",
    note: "Senior solar scientist at the U. R. Rao Satellite Centre and Principal Scientist of the Aditya-L1 mission. His research includes solar magnetic fields, optics and instrumentation, and he has contributed to AstroSat, Chandrayaan-1 and Chandrayaan-2.",
    centres: ["ursc"],
    programmes: ["Aditya-L1", "AstroSat", "Chandrayaan-1", "Chandrayaan-2", "XPoSat"],
    source: sources.spacecraft,
  },

  {
    id: "vikram-sarabhai-science",
    name: "Vikram Sarabhai",
    role: "Cosmic-ray physicist and space science pioneer",
    category: "Scientist",
    years: "1919–1971",
    note: "A leading physicist whose research in cosmic rays and atmospheric science helped establish the scientific foundations of India's space research programme.",
    centres: ["vssc"],
    programmes: ["Foundations"],
    source: sources.timeline,
  },

  {
    id: "ur-rao-scientist",
    name: "U. R. Rao",
    role: "Space scientist and satellite pioneer",
    category: "Scientist",
    years: "1932–2017",
    note: "A major figure in India's satellite technology and space science programme who contributed to the development of India's early scientific and operational spacecraft.",
    centres: ["ursc"],
    programmes: ["Aryabhata", "INSAT", "IRS"],
    source: sources.spacecraft,
  },
];