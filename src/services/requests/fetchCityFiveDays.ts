import api from "../api/api";
import { fetchCityType } from "../types/fetchCity";

interface fetchCityProps {
  latitude: number;
  longitude: number;
}

export const fetchCityFiveDays= async ({
  latitude,
  longitude,
}: fetchCityProps): Promise<fetchCityType[]> => {
  try {
    const { data } = await api.get(
      `/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=16e3c009627dcd5b7f36d406db8fbbd7

`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return null; 
  }
};
