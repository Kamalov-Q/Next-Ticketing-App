export interface Ticket {
  _id?: string;
  title: string;
  description: string;
  category: Category;
  priority: number;
  status: Status;
  progress: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Status = "started" | "in-progress" | "completed";

export type Category =
  | "Hardware Problem"
  | "Software Problem"
  | "Network Problem"
  | "Other";
