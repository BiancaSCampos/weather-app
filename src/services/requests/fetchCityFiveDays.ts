import api from "../api/api";
import { fetchCityType } from "../types/fetchCity";

interface fetchCityProps {
  latitude: number;
  longitude: number;
}

export const fetchCityFiveDays = async ({
  latitude,
  longitude,
}: fetchCityProps): Promise<fetchCityType[]> => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const { data } = await api.get(
      `/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
};
