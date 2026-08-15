import type { Launcher } from "@/lib/data/types";
import { sources } from "@/data/sources";

export interface LauncherDetail extends Launcher {
  height?: number;
  diameter?: number;
  payload_to_leo?: number | null;
  payload_to_gto?: number | null;
  total_launches?: number;
  successful_launches?: number;
  failed_launches?: number;
  success_rate?: number;
  maiden_flight_date?: string;
  first_success_date?: string;
  last_flight?: string;
  organization?: string;
  propellant?: string;
  engines?: string[];
  thrust_sl?: number;
  description?: string;
  legacy?: string;
}

export const launchers: LauncherDetail[] = [
  {
    id: "sounding",
    name: "Rohini Sounding Rockets",
    era: "1963–present",
    status: "Operational",
    firstFlight: "1963",
    role: "Atmospheric and technology experiments",
    stages: 1,
    note: "The sounding-rocket programme predates the satellite era and was foundational to India's space capability. Rohini rockets conducted crucial atmospheric research and technology validation for independent Indian spaceflight.",
    source: sources.timeline,
    height: 7.5,
    diameter: 0.34,
    payload_to_leo: 0.4,
    total_launches: 35,
    successful_launches: 33,
    failed_launches: 2,
    success_rate: 94.3,
    maiden_flight_date: "21 November 1963",
    first_success_date: "1963",
    organization: "ISRO",
    propellant: "Solid (HTPB)",
    description:
      "The Rohini family of sounding rockets represented India's first independent entry into rocketry. These single-stage vehicles reached altitudes of up to 575 km, enabling atmospheric science, meteorology, and ionospheric research. The Rohini programme validated critical technologies that would later be integrated into India's satellite launch vehicles.",
    legacy:
      "Foundation for SLV-3 development; demonstrated indigenous solid rocket capabilities",
  },

  {
    id: "slv",
    name: "SLV-3",
    era: "1979–1983",
    status: "Retired",
    firstFlight: "10 Aug 1979",
    role: "India's first operational satellite launch vehicle",
    stages: 4,
    note: "India's first satellite launch vehicle to achieve an orbital launch success, demonstrating indigenous launch capability.",
    source: sources.timeline,
    height: 22.0,
    diameter: 1.0,
    payload_to_leo: 40,
    total_launches: 4,
    successful_launches: 1,
    failed_launches: 3,
    success_rate: 25.0,
    maiden_flight_date: "10 August 1979",
    first_success_date: "18 July 1980",
    last_flight: "17 May 1983",
    organization: "ISRO",
    propellant: "Solid (4 stages)",
    engines: ["Solid Rocket Motors"],
    description:
      "SLV-3 was India's first attempt at an indigenous satellite launch vehicle, a four-stage solid-fueled rocket. Despite a limited success rate (only 1 of 4 flights succeeded), the 18 July 1980 launch of Rohini satellite RS-1 was historic—making India the sixth nation to independently place a satellite in orbit. The vehicle's four solid stages limited its payload capacity, but the programme proved critical for building expertise in multi-stage rockets and vehicle integration.",
    legacy:
      "First successful indigenous launch; paved way for ASLV and PSLV development",
  },

  {
    id: "aslv",
    name: "Augmented Satellite Launch Vehicle (ASLV)",
    era: "1987–1994",
    status: "Retired",
    firstFlight: "24 Mar 1987",
    role: "Technology development and augmented payload capacity",
    stages: 5,
    note: "Built experience in staged launch vehicles and augmented payload capacity. ASLV added two solid strap-on boosters to SLV-3, demonstrating India's growing sophistication.",
    source: sources.timeline,
    height: 24.0,
    diameter: 1.0,
    payload_to_leo: 150,
    total_launches: 4,
    successful_launches: 2,
    failed_launches: 2,
    success_rate: 50.0,
    maiden_flight_date: "24 March 1987",
    first_success_date: "20 May 1992",
    last_flight: "4 May 1994",
    organization: "ISRO",
    propellant: "Solid with strap-on boosters",
    engines: ["Solid Rocket Motors"],
    description:
      "ASLV was an improved version of SLV-3 featuring two solid strap-on boosters to increase payload to LEO from 40 kg to approximately 150 kg. Four flights were conducted between 1987–1994. The vehicle reached only 50% success rate, but successful missions demonstrated the viability of strap-on booster augmentation. ASLV missions 3 and 4 (1992, 1994) succeeded, carrying Indian satellites into orbit. The technology developed here—particularly liquid-fueled upper-stage concepts—transitioned into PSLV development.",
    legacy:
      "Strap-on technology validated; transition to liquid-stage concepts; intermediate step to PSLV",
  },

  {
    id: "pslv",
    name: "Polar Satellite Launch Vehicle (PSLV)",
    era: "1993–present",
    status: "Operational",
    firstFlight: "20 Sep 1993",
    role: "Polar, Sun-synchronous and multi-payload launches",
    stages: 4,
    note: "India's long-running launch workhorse with extensive domestic and international flight history. Over 60 successful consecutive launches.",
    source: sources.timeline,
    height: 44.4,
    diameter: 2.8,
    payload_to_leo: 1600,
    payload_to_gto: null,
    total_launches: 62,
    successful_launches: 61,
    failed_launches: 1,
    success_rate: 98.4,
    maiden_flight_date: "20 September 1993",
    first_success_date: "21 March 1994",
    last_flight: "14 August 2024",
    organization: "ISRO",
    propellant:
      "Solid + Liquid stages (strap-on boosters, liquid core)",
    engines: [
      "HTPB SRMs",
      "Vikas Engines (L10 and L40)",
    ],
    thrust_sl: 7150,
    description:
      "PSLV is India's highly reliable workhorse launch vehicle, used for Earth observation, communication, navigation and scientific missions. The four-stage rocket features solid strap-on boosters (S125) and liquid stages with Vikas engines. After an initial failure (PSLV-C1, 1993), the vehicle achieved unprecedented reliability—61 consecutive successes across 62 flights as of 2024. PSLV-C11 (2008) demonstrated India's capability to launch multiple satellites. The vehicle has become India's commercial launcher of choice, with international payloads aboard numerous missions. PSLV can reach Sun-synchronous orbits and has deployed satellites for Chandrayaan missions, Mars Orbiter, and hundreds of international clients.",
    legacy:
      "World's most reliable operational launcher; foundation of India's commercial space programme; enables polar and SSO missions",
  },

  {
    id: "gslv",
    name: "Geosynchronous Satellite Launch Vehicle (GSLV)",
    era: "2001–present",
    status: "Operational",
    firstFlight: "18 Apr 2001",
    role: "Geosynchronous transfer orbit and communication satellite launches",
    stages: 3,
    note: "Three-stage launcher with an indigenous cryogenic upper stage in operational variants. Critical for India's communication satellite constellation.",
    source: sources.timeline,
    height: 49.0,
    diameter: 2.8,
    payload_to_leo: 5000,
    payload_to_gto: 2250,
    total_launches: 20,
    successful_launches: 17,
    failed_launches: 3,
    success_rate: 85.0,
    maiden_flight_date: "18 April 2001",
    first_success_date: "20 September 2004",
    last_flight: "12 August 2024",
    organization: "ISRO",
    propellant:
      "Solid (S200 boosters) + Liquid (L37 core) + Cryogenic (C25)",
    engines: [
      "HTPB SRMs (strap-on)",
      "Vikas engines (L37)",
      "CE-7.5 cryogenic engine (C25)",
    ],
    thrust_sl: 7900,
    description:
      "GSLV is India's heavy-lift launch vehicle, designed to place communication satellites into geosynchronous transfer orbit. It uses four solid strap-on boosters (S200), a liquid core stage (L37) with Vikas engines, and an indigenous cryogenic upper stage (C25) with the CE-7.5 engine. Development of the cryogenic stage was a major milestone—achieving mastery over cryogenic technology positioned India among spacefaring nations. GSLV has 20 flights (as of 2024) with 17 successes. Early failures were related to cryogenic stage issues, but recent flights have been successful. The vehicle carries India's domestic communication satellites (INSAT, GSAT series) and has been used for scientific missions like Chandrayaan-1 (via earlier launch).",
    legacy:
      "Demonstrated indigenous cryogenic technology; enables GTO missions; supports India's communication satellite constellation",
  },

  {
    id: "lvm3",
    name: "Launch Vehicle Mark III (LVM3 / GSLV Mk III)",
    era: "2014–present",
    status: "Operational",
    firstFlight: "05 Jun 2014",
    role: "Heavy-lift launch vehicle for lunar, interplanetary and GEO missions",
    stages: 3,
    note: "Heavy-lift launcher used for Chandrayaan-2, Chandrayaan-3 and commercial missions. India's most powerful operational vehicle.",
    source: sources.timeline,
    height: 43.5,
    diameter: 4.0,
    payload_to_leo: 8000,
    payload_to_gto: 4000,
    total_launches: 10,
    successful_launches: 9,
    failed_launches: 1,
    success_rate: 90.0,
    maiden_flight_date: "05 June 2014",
    first_success_date: "14 December 2014",
    last_flight: "05 January 2025",
    organization: "ISRO",
    propellant:
      "Solid strap-on boosters (S200) + Liquid core (L110 with Vikas) + Cryogenic upper stage (C25)",
    engines: [
      "HTPB SRMs (strap-on, 2×)",
      "Vikas engines (L110, 2×)",
      "CE-7.5 cryogenic engine (C25)",
    ],
    thrust_sl: 10400,
    description:
      "LVM3, also called GSLV Mark III, is India's heaviest and most powerful operational launch vehicle. With two large solid strap-on boosters (S200), a liquid core stage (L110) with two Vikas engines, and a cryogenic upper stage (C25), LVM3 can deliver 8 tonnes to LEO or 4 tonnes to GEO. The vehicle enabled India's ambitious lunar and interplanetary programmes: Chandrayaan-2 (2019) and Chandrayaan-3 (2023) both relied on LVM3. The September 2023 successful landing of Chandrayaan-3's lander on the lunar south pole was a defining moment for India's space programme. LVM3 has also launched commercial missions and communication satellites.",
    legacy:
      "Enables lunar and interplanetary missions; foundation of India's deep-space exploration; heavy-lift capability for advanced missions",
  },

  {
    id: "sslv",
    name: "Small Satellite Launch Vehicle (SSLV)",
    era: "2022–present",
    status: "Operational",
    firstFlight: "7 Aug 2022",
    role: "Dedicated small satellite launches with quick turnaround",
    stages: 3,
    note: "Responsive small-satellite launcher designed for faster, more frequent launch cadence. Demonstrates ISRO's commercial focus.",
    source: sources.timeline,
    height: 34.0,
    diameter: 2.0,
    payload_to_leo: 500,
    total_launches: 2,
    successful_launches: 1,
    failed_launches: 1,
    success_rate: 50.0,
    maiden_flight_date: "7 August 2022",
    first_success_date: "2 February 2024",
    last_flight: "2 February 2024",
    organization: "ISRO",
    propellant: "Solid rocket stages",
    engines: ["Solid Rocket Motors"],
    description:
      "SSLV is India's newest dedicated launcher, designed specifically for small satellite missions (100–500 kg class). The three-stage all-solid-rocket vehicle was developed to provide responsive, flexible access to space with minimal payload integration time. SSLV-D1 (August 2022) experienced a control anomaly, but SSLV-D2 (February 2024) successfully launched a technology demonstrator satellite. The vehicle's rapid turnaround concept aims to reduce turnaround time between missions. SSLV targets India's growing commercial small-satellite industry and international launch customers, competing with similar vehicles globally.",
    legacy:
      "Responsive access to space; supports growing small-sat industry; rapid turnaround capability",
  },

  {
    id: "rlv",
    name: "Reusable Launch Vehicle (RLV) Technology Demonstrator",
    era: "2023–ongoing",
    status: "Development",
    firstFlight: "2 Apr 2023",
    role: "Reusable launch vehicle technology maturation",
    stages: 0,
    note: "Reusable launch vehicle technology demonstrator with autonomous landing validation. Part of India's future launch architecture.",
    source: sources.timeline,
    height: 9.0,
    diameter: 2.2,
    payload_to_leo: null,
    total_launches: 1,
    successful_launches: 1,
    failed_launches: 0,
    success_rate: 100.0,
    maiden_flight_date: "2 April 2023",
    first_success_date: "2 April 2023",
    organization: "ISRO",
    propellant: "Rocket motors + ramjet/scramjet concepts",
    description:
      "The RLV Technology Demonstrator is India's experimental horizontal take-off and landing (HTOL) vehicle, scaled down for technology validation. The April 2023 autonomous landing trial successfully demonstrated controlled descent and landing under automatic guidance. The vehicle is designed to eventually support an air-breathing propulsion concept for future orbital stages. RLV development represents India's long-term vision for reducing launch costs through vehicle reusability.",
    legacy:
      "Foundational for future low-cost reusable launch architecture; demonstrates autonomous landing technology",
  },
];