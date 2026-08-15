import { sources } from "@/data/sources";
import type { SourceRef } from "@/lib/data/types";

/**
 * India-layer records (spec §23). Coordinates are approximate city-level
 * positions for placing a marker on the illustrative India map — not
 * survey-grade facility coordinates.
 */
export interface Centre {
  id: string;
  name: string;
  location: string;
  focus: string;
  note: string;
  /** Approximate [latitude, longitude] for map placement — representative, not precise. */
  coords: [number, number];
  source: SourceRef;
  established?: string;
  organization?: string;
  programs?: string[];
}

export const centres: Centre[] = [
  {
    id: "shar",
    name: "Satish Dhawan Space Centre (SDSC SHAR)",
    location: "Sriharikota",
    focus: "Primary launch facility for PSLV, GSLV, LVM3 and SSLV",
    note: "India's foremost spaceport and launch range. SDSC operates the infrastructure for all major ISRO launch vehicles, handling satellite integration, testing, fuel and payload preparation. Historic site of India's first successful satellite launch (SLV-3, 1980) and Chandrayaan-3 Moon lander mission (2023).",
    coords: [14.03, 79.76],
    source: sources.visitors,
    established: "1971",
    organization: "ISRO",
    programs: ["PSLV", "GSLV", "LVM3", "SSLV", "Satellite integration"]
  },
  {
    id: "vssc",
    name: "Vikram Sarabhai Space Centre (VSSC)",
    location: "Thiruvananthapuram",
    focus: "Launch vehicle systems and solid rocket motor development",
    note: "Major centre for launch vehicle development, integration and testing. VSSC designed and developed the solid rocket motor subsystems for PSLV, GSLV and LVM3, including the strap-on boosters. Home to India's first satellite designer and engineer Vikram Sarabhai's legacy.",
    coords: [8.55, 76.95],
    source: sources.visitors,
    established: "1963",
    organization: "ISRO",
    programs: ["Solid Rocket Motors", "Launch Vehicle Development", "Strap-on Boosters", "PSLV", "GSLV"]
  },
  {
    id: "ursc",
    name: "Spacecraft Centre / URSC (Indian Space Research Centre)",
    location: "Bengaluru",
    focus: "Spacecraft design, development and systems integration",
    note: "ISRO's primary spacecraft and satellite design centre. URSC has designed and integrated over 125 satellites across all categories—Earth observation, communication, navigation, science and planetary missions. Chandrayaan lunar orbiters and Mangalyaan Mars orbiter were integrated here.",
    coords: [13.02, 77.57],
    source: sources.visitors,
    established: "1972",
    organization: "ISRO",
    programs: ["Spacecraft Integration", "Satellite Design", "Lunar missions", "Mars missions"]
  },
  {
    id: "sac",
    name: "Space Applications Centre (SAC)",
    location: "Ahmedabad",
    focus: "Earth observation, satellite applications and GIS technology",
    note: "Primary centre for Earth observation payload development and space applications. SAC develops remote sensing instruments and processes data from ISRO's Earth observation satellites for agricultural, disaster and environmental monitoring.",
    coords: [23.18, 72.65],
    source: sources.visitors,
    established: "1975",
    organization: "ISRO",
    programs: ["Earth Observation", "Remote Sensing", "Satellite Applications", "GIS"]
  },
  {
    id: "lpsc",
    name: "Liquid Propulsion Systems Centre (LPSC)",
    location: "Thiruvananthapuram",
    focus: "Liquid rocket engines and propulsion systems",
    note: "Designed and developed India's Vikas engines used in PSLV and GSLV. LPSC also oversees cryogenic technology development for indigenous launch capability.",
    coords: [8.53, 76.91],
    source: sources.visitors,
    established: "1978",
    organization: "ISRO",
    programs: ["Vikas Engines", "Liquid Rocket Motors", "Propulsion Systems"]
  },
  {
    id: "iprc",
    name: "ISRO Propulsion Research Centre (IPRC)",
    location: "Mahendragiri",
    focus: "Cryogenic engine testing and high-energy propellant development",
    note: "Dedicated facility for cryogenic engine testing and development. IPRC validated India's CE-7.5 cryogenic engine—a crucial milestone for independent access to GEO orbit.",
    coords: [12.24, 79.75],
    source: sources.visitors,
    established: "1994",
    organization: "ISRO",
    programs: ["Cryogenic Engines", "Engine Testing", "Propellant Development"]
  },
  {
    id: "nrsc",
    name: "National Remote Sensing Centre (NRSC)",
    location: "Hyderabad",
    focus: "Remote sensing data reception, processing and analysis",
    note: "ISRO's primary Earth observation data processing centre. NRSC receives, archives and processes data from all Indian Earth observation satellites and conducts scientific analysis for applications.",
    coords: [17.58, 78.57],
    source: sources.visitors,
    established: "1992",
    organization: "ISRO",
    programs: ["Data Reception", "Data Processing", "Image Analysis"]
  },
  {
    id: "issdc",
    name: "ISRO Space Science Data Centre (ISSDC)",
    location: "Bengaluru",
    focus: "Space science mission data archive and analysis",
    note: "Repository and analysis centre for data from ISRO's science missions including Chandrayaan and Mangalyaan. Supports international collaboration and scientific research using ISRO mission data.",
    coords: [13.02, 77.57],
    source: sources.visitors,
    established: "2003",
    organization: "ISRO",
    programs: ["Data Archive", "Science Data Analysis", "Lunar & Planetary Data"]
  }
];
