export interface Facility {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  isDefault: boolean;
  openingTime: string; // e.g., "08:00"
  closingTime: string; // e.g., "18:00"
}

export type Statuses = "Open" | "Closed";
