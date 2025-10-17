// // src/utils/ridesStore.ts

// export interface Ride {
//   id: number;
//   driver: string;
//   from: string;
//   to: string;
//   date: string;
//   time: string;
//   seats: number;
//   avatar: string;
// }

// // In-memory storage for rides
// let ridesStore: Ride[] = [
//   {
//     id: 1,
//     driver: "Sarah M.",
//     from: "Downtown",
//     to: "Airport",
//     date: "Oct 17",
//     time: "8:00 AM",
//     seats: 3,
//     avatar: "SM",
//   },
//   {
//     id: 2,
//     driver: "James K.",
//     from: "West End",
//     to: "University",
//     date: "Oct 17",
//     time: "9:30 AM",
//     seats: 2,
//     avatar: "JK",
//   },
//   {
//     id: 3,
//     driver: "Maria R.",
//     from: "Suburb Hills",
//     to: "Downtown",
//     date: "Oct 17",
//     time: "7:15 AM",
//     seats: 4,
//     avatar: "MR",
//   },
//   {
//     id: 4,
//     driver: "Alex T.",
//     from: "North District",
//     to: "Shopping Mall",
//     date: "Oct 18",
//     time: "2:00 PM",
//     seats: 2,
//     avatar: "AT",
//   },
// ];

// let listeners: Array<() => void> = [];

// export function getRides(): Ride[] {
//   return ridesStore;
// }

// export function addRide(ride: Ride): void {
//   ridesStore = [ride, ...ridesStore];
//   listeners.forEach((listener) => listener());
// }

// export function subscribeToRides(listener: () => void): () => void {
//   listeners.push(listener);
//   return () => {
//     listeners = listeners.filter((l) => l !== listener);
//   };
// }