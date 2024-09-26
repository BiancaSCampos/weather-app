// cityMiddleware.ts

import { City } from "../../utils/context/cityContext";


// Middleware to filter and format the cities
export const cityDataMiddleware = (data: any[]): City[] => {
  // Create a set to keep track of unique city, state, and country combinations
  const seen = new Set<string>();

  // Filter the data to remove duplicates and map it to the desired format
  return data
    .filter((item: { name: string; state?: string; country: string; lat: number; lon: number }) => {
      const identifier = `${item.name}, ${item.state || ""}, ${item.country},${item.lat}, ${item.lon}`;
      if (seen.has(identifier)) {
        return false; // Skip if this combination has been seen
      }
      seen.add(identifier);
      return true; // Include if this combination is unique
    })
    .map((item: { name: string; state?: string; country: string; lat: number; lon: number }) => {
      return {
        name: item.name,
        state: item.state,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      };
    });
};
