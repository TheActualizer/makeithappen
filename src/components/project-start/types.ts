export type ProjectType = "healthcare" | "finance" | "real-estate" | "other";
export type Timeline = "asap" | "1-3-months" | "3-6-months" | "6-plus-months";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: ProjectType;
  description: string;
  timeline: Timeline;
  consultationDate?: Date;
  consultationTime?: string;
}