// src/Autocomplete.tsx
import React, { ReactElement, useContext, useState } from "react";
import { CityContext } from "../../../utils/context/cityContext";
import { useCity } from "../../../utils/hooks/useCity";

interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<City[]>;
  placeholder: string;
  icon?: ReactElement;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  fetchSuggestions,
  placeholder,
  icon,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { setSelectedCity } = useCity();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setInputValue(userInput);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);

    if (userInput.length > 0) {
      setLoading(true);

      const suggestions = await fetchSuggestions(userInput);
      setFilteredSuggestions(suggestions);

      setLoading(false);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement>, suggestion: City) => {
    const formattedValue = `${suggestion.name}, ${suggestion.state || ""}, ${
      suggestion.country
    }`;
    setInputValue(formattedValue);
    setSelectedCity(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    console.log("Selected city:", suggestion);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selected = filteredSuggestions[activeSuggestionIndex];
      const formattedValue = `${selected.name}, ${selected.state || ""}, ${
        selected.country
      }`;
      setInputValue(formattedValue);

      setShowSuggestions(false);
      console.log("Selected city:", selected);
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex === 0) return;
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === "ArrowDown") {
      if (activeSuggestionIndex + 1 === filteredSuggestions.length) return;
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    return filteredSuggestions.length ? (
      <ul className="suggestions text-indigo-500 font-poppins rounded-xl">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "active";
          }
          return (
            <li
              className={`hover:bg-indigo-100 rounded-xl p-1 ${className}`}
              key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}`}
              onClick={(e) => onClick(e, suggestion)} // Pass suggestion to onClick
            >
              {`${suggestion.name}, ${suggestion.state || ""}, ${
                suggestion.country
              }`}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions available</em>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center rounded-xl w-full text-indigo-700">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputValue ?? ""}
          className="w-full font-poppins text-base resize-none outline-none border-none p-1"
          placeholder={placeholder}
        />
        {icon}
      </div>
      {showSuggestions && inputValue && <SuggestionsListComponent />}
    </div>
  );
};

export default Autocomplete;
