import api from "../api/api";
import { cityDataMiddleware } from "../middlewares/cityDataMD";

export interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export const fetchCities = async (query: string): Promise<City[]> => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const { data } = await api.get(
      `/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    return cityDataMiddleware(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
