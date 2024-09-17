import React, { useEffect, useState } from "react";
import { fetchCityType } from "../../../services/types/fetchCity";
import { useCity } from "../../../utils/hooks/useCity";
import { fetchCity } from "../../../services/requests/fetchCity";
import { fetchCityFiveDays } from "../../../services/requests/fetchCityFiveDays";
import { extractTemperatureData } from "../../../utils/functions/extractTemperatureData";

interface InfoItemProps {
  title: string;
  info: string;
}

interface DayInfoProps {
  title: string;
  minTemp: string;
  maxTemp: string;
}

interface TemperatureData {
  date: string;
  temp_min: number;
  temp_max: number;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, info }) => {
  return (
    <div className="w-full">
      {title}: <span className="font-semibold">{info}</span>
    </div>
  );
};

const DayInfo: React.FC<DayInfoProps> = ({ title, minTemp, maxTemp }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-sm">
        <span className="text-blue-500">⬇</span>
        {minTemp} <span className="text-orange-400">⬆</span>
        {maxTemp}
      </span>
    </div>
  );
};

const WeatherSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-xl p-3 mt-4 shadow-md ">
      <div className="animate-pulse">
        <div className="h-6 bg-indigo-300 rounded-3xl w-3/4"></div>
        <div className="text-4xl mt-2 font-semibold">
          <div className="h-10 bg-indigo-300 rounded-3xl w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 mt-3 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-indigo-300 rounded-3xl w-1/3"></div>
            <div className="h-4 bg-indigo-300 rounded-3xl w-1/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-indigo-300 rounded-3xl w-1/2"></div>
            <div className="h-4 bg-indigo-300 rounded-3xl w-1/4"></div>
          </div>
        </div>
        <span className="w-full h-0.5 mt-2 bg-indigo-300 rounded-3xl-lg"></span>
        <div className="flex justify-between mt-3 space-x-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-4 bg-indigo-300 rounded-3xl w-12"></div>
              <div className="h-4 bg-indigo-300 rounded-3xl w-8"></div>
              <div className="h-4 bg-indigo-300 rounded-3xl w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DisplayCityCard = () => {
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<fetchCityType | null>(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState<
    TemperatureData[] | null
  >(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchDataCity = async () => {
      if (selectedCity && selectedCity.lat !== 0 && selectedCity.lon !== 0) {
        setLoading(true);
        try {
          const cityData = await fetchCity({
            latitude: selectedCity.lat,
            longitude: selectedCity.lon,
          });

          const fiveDaysForecastData = await fetchCityFiveDays({
            latitude: selectedCity.lat,
            longitude: selectedCity.lon,
          });
          const fiveDaysForecast = extractTemperatureData(fiveDaysForecastData);

          setCityData(cityData);
          setFiveDaysForecast(fiveDaysForecast);
          console.log(fiveDaysForecastData);
        } catch (error) {
          console.error("Failed to fetch city data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDataCity();
  }, [selectedCity]);

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return daysOfWeek[date.getDay()];
  };

  return (
    <>
      {selectedCity.name && !loading && cityData ? (
        <div className="flex flex-col bg-white rounded-xl p-3 font-poppins text-base mt-4 shadow-md text-indigo-900">
          <div className="text-base">
            <h2>
              {selectedCity.name}, {selectedCity.state} - {selectedCity.country}
            </h2>
          </div>
          <div className="text-4xl mt-2 font-semibold">
            <span>
              {Math.round(cityData.main.temp)}°C{" "}
              {cityData.weather[0].description}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-3">
            <div className="text-base">
              <span className="font-semibold">
                <span className="text-blue-500">⬇</span>
                {Math.round(cityData.main.temp_min)}°C
              </span>
              <span className="font-semibold">
                <span className="text-orange-400">⬆</span>
                {Math.round(cityData.main.temp_max)}°C
              </span>
            </div>
            <InfoItem title="Sensação" info={`${cityData.main.feels_like}°C`} />
            <InfoItem title="Vento" info={`${cityData.wind.speed} km/h`} />
            <InfoItem title="Humidade" info={`${cityData.main.humidity}%`} />
          </div>
          <span className="w-full h-0.5 mt-2 bg-indigo-200 rounded-lg" />

          <div className="flex justify-between mt-3">
            {fiveDaysForecast.map((day, index) => (
              <DayInfo
                key={index}
                title={getDayOfWeek(day.date)} // Assuming the `date` field is in a format like "Tuesday"
                minTemp={`${Math.round(day.temp_min)}°`}
                maxTemp={`${Math.round(day.temp_max)}°`}
              />
            ))}
          </div>
        </div>
      ) : (
        <WeatherSkeleton />
      )}
    </>
  );
};

export default DisplayCityCard;
