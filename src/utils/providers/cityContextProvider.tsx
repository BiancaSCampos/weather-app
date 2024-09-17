import React, { ReactNode, useState } from "react";
import { City, CityContext } from "../context/cityContext";

interface CityProviderProps {
  children: ReactNode;
}
const defaultCity: City = {
  name: "",
  state: "",
  country: "",
  lat: 0,
  lon: 0,
};

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(defaultCity);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
