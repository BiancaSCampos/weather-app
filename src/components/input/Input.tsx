import React, { ReactElement } from "react";
import Autocomplete from "./autocomplete/autocomplete";
import { fetchCities } from "../../services/requests/fetchCities";

interface InputProps {
  placeholder: string
  icon?: ReactElement
}

const Input = ({placeholder, icon}: InputProps) => {
  return (
    <div>
      <div className="z-30 border h-fit w-full flex bg-white rounded-xl items-center justify-between p-1 mt-6 shadow-md">
        <Autocomplete fetchSuggestions={fetchCities}  placeholder={placeholder} icon={icon} />
      </div>
    </div>
  );
};

export default Input;
