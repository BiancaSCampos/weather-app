import api from "../api/api";

interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export const fetchCities = async (query: string): Promise<City[]> => {
  try {
    const { data } = await api.get(
      `/geo/1.0/direct?q=${query}&limit=5&appid=16e3c009627dcd5b7f36d406db8fbbd7`
    );

    // Create a set to keep track of unique city, state, and country combinations
    const seen = new Set<string>();

    // Filter the data to remove duplicates and map it to the desired format
    const cityNames = data
      .filter(
        (item: {
          name: string;
          state?: string;
          country: string;
          lat: number;
          lon: number;
        }) => {
          const identifier = `${item.name}, ${item.state || ""}, ${
            item.country
          },${item.lat}, ${item.lon}`;
          if (seen.has(identifier)) {
            return false; // Skip if this combination has been seen
          }
          seen.add(identifier);
          return true; // Include if this combination is unique
        }
      )
      .map(
        (item: {
          name: string;
          state?: string;
          country: string;
          lat: number;
          lon: number;
        }) => {
          return {
            name: item.name,
            state: item.state,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
          };
        }
      );

    return cityNames;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
