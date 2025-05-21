import type { Facility } from "../types/facilities";

const STORAGE_KEY = "facilities";

export const getFacilities = (): Facility[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFacilities = (facilities: Facility[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(facilities));
};
