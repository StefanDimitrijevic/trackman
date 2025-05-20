export interface Facility {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  isDefault: boolean;
  openingHour: string; // e.g., "08:00"
  closingHour: string; // e.g., "18:00"
}
