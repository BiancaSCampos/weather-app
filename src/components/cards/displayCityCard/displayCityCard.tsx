import React, { useContext } from "react";
import { CityContext } from "../../../utils/context/cityContext";

interface InfoItemProps {
  title: string;
  info: string;
}

interface DayInfoProps {
  title: string;
  minTemp: string;
  maxTemp: string;
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
    <div className="flex flex-col   ">
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-sm">
        <span className="text-blue-500">⬇</span>
        {minTemp} <span className="text-orange-400">⬆</span>
        {maxTemp}
      </span>
    </div>
  );
};

const DisplayCityCard = () => {

  const context = useContext(CityContext);

  
  return (
    <div className=" flex flex-col bg-white rounded-xl p-3 font-poppins text-base mt-4 shadow-md text-indigo-900">
      <div className="text-base">
        <p>Niterói, RJ - Brasil</p>
      </div>
      <div className="text-4xl mt-2 font-semibold">
        <span>20°C</span> Nublado
      </div>
      <div className=" grid grid-cols-2 mt-3">
        <div className="text-base ">
          <span className="font-semibold">
            <span className="text-blue-500">⬇</span>16°C
          </span>
          <span className="font-semibold">
            <span className="text-orange-400">⬆</span> 25°C
          </span>
        </div>
        <InfoItem title="Sensação" info="19°C" />
        <InfoItem title="Vento" info="18km/h" />
        <InfoItem title="Humidade" info="89%" />
      </div>
      <span className="w-full h-0.5 mt-2 bg-indigo-200 rounded-lg" />
      <div className="flex justify-between mt-3">
        <DayInfo title="Terça" minTemp="18°" maxTemp="26°" />
        <DayInfo title="Terça" minTemp="18°" maxTemp="26°" />
        <DayInfo title="Terça" minTemp="18°" maxTemp="26°" />
        <DayInfo title="Terça" minTemp="18°" maxTemp="26°" />
        <DayInfo title="Terça" minTemp="18°" maxTemp="26°" />
      </div>
    </div>
  );
};

export default DisplayCityCard;
