const STORAGE_KEY = "tripmate_trips";

export function getTrips() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTrips(trips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function generateId() {
  return crypto.randomUUID();
}