export type Category =
  | "Foundations"
  | "Technology"
  | "Communication"
  | "Earth Observation"
  | "Navigation"
  | "Science"
  | "Lunar"
  | "Planetary"
  | "Solar"
  | "Human Spaceflight";

export type Status =
  | "Operational"
  | "Retired"
  | "Ended"
  | "Re-entered"
  | "Not operational"
  | "Launch unsuccessful"
  | "Technology demonstration"
  | "Mission complete"
  | "Planned"
  | "Under development";

export interface SourceRef {
  title: string;
  url: string;
}

export interface Spacecraft {
  id: string;
  name: string;
  year: number;
  category: Category;
  launcher: string;
  orbit: string;
  status: Status;
  note: string;
  source?: SourceRef;
}

export interface Mission {
  id: string;
  name: string;
  year: number;
  destination: string;
  launcher: string;
  status: Status;
  summary: string;
  source?: SourceRef;
}

export interface Launch {
  id: string;
  year: number;
  date: string;
  vehicle: string;
  payload: string;
  outcome:
    | "Success"
    | "Unsuccessful"
    | "Technology demonstration";
  note?: string;
  source?: SourceRef;
}

export interface Launcher {
  id: string;
  name: string;
  era: string;
  status:
    | "Retired"
    | "Operational"
    | "Development";
  firstFlight: string;
  role: string;
  stages: number;
  note: string;
  source?: SourceRef;

  height?: number;
  diameter?: number;

  // null = not applicable / not available
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

export interface TimelineEvent {
  year: number;
  label: string;
  title: string;
  text: string;
  category: string;
}