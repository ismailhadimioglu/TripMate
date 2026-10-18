export function createEmptyTrip() {
  return {
    id: "",
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: 0,
    accommodation: { name: "", address: "" },
    places: [],
  };
}