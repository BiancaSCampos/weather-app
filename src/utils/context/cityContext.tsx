import React, { createContext, useContext, useState, ReactNode } from "react";

export interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

export const CityContext = createContext<CityContextType | undefined>(
  undefined
);
