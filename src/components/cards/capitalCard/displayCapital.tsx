import React, { useEffect, useState } from "react";
import { fetchCity } from "../../../services/requests/fetchCity";
import { capitals } from "../../../utils/constants/capitals";

interface fetchCityType {
  name: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
}

export const DisplayCapitals = () => {
  const [weatherData, setWeatherData] = useState<
    { city: string; data: fetchCityType }[]
  >([]);

  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      const promises = Object.entries(capitals).map(
        async ([city, { latitude, longitude }]) => {
          const data = await fetchCity({ latitude, longitude });
          return { city, data };
        }
      );

      const results = await Promise.all(promises);

      const successfulResults = results.filter(
        (result) => result.data !== null
      ) as { city: string; data: fetchCityType }[];

      setWeatherData(successfulResults);
    };

    fetchAllCitiesWeather();
  }, []);

  const CapitalSkeleton = () => {
    return (
      <>
        {[...Array(27)].map((_, index) => (
          <div className="bg-white animate-pulse rounded-3xl p-2 flex items-center justify-between w-full">
            <div className="w-1/2 h-6 bg-indigo-300 rounded-3xl"></div>
            <div className="flex space-x-4">
              <div className="w-12 h-6 bg-indigo-300 rounded-3xl"></div>
              <div className="w-12 h-6 bg-indigo-300 rounded-3xl"></div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <h2 className="font-poppins text-white text-[1.8rem] mt-3 mb-3  ">
        Capitais
      </h2>
      <div className="">
        <ul className="space-y-2">
          {weatherData.length === 0 ? (
            <CapitalSkeleton />
          ) : (
            weatherData.map(({ city, data }, index) => (
              <li
                key={index}
                className="bg-white shadow p-2 rounded-xl flex text-indigo-900 items-center justify-between"
              >
                <h2 className="text-xl ">{city}</h2>
                <div className="text-base font-poppins ">
                  <span className="font-semibold mr-3">
                    <span className="text-blue-500">⬇</span>
                    {Math.round(data.main.temp_min)}°C
                  </span>
                  <span className="font-semibold">
                    <span className="text-orange-400">⬆</span>
                    {Math.round(data.main.temp_max)}°C
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
