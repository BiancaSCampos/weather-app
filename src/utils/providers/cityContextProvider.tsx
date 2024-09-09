import React, { ReactNode, useState } from "react";
import { City, CityContext } from "../context/cityContext";

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
