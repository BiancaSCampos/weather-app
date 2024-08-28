// src/Autocomplete.tsx
import React, { ReactElement, useState } from "react";

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
  placeholder: string;
  icon?: ReactElement;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  fetchSuggestions,
  placeholder,
  icon,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = e.currentTarget.innerText;
    console.log("Clicked suggestion:", selectedValue);
    setInputValue(selectedValue);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputValue(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
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
      <ul className="suggestions text-indigo-500 font-poppins rounded-xl ">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "";
          }
          return (
            <li
              className="hover:bg-indigo-100 rounded-xl p-1 "
              key={suggestion}
              onClick={onClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions  ">
        <em>Nenhuma sugestão dísponivel</em>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center  rounded-xl w-full text-indigo-700">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputValue ?? ""}
          className="w-full font-poppins text-lg resize-none outline-none border-none p-1"
          placeholder={placeholder}
        />
        {icon}
      </div>
      {showSuggestions && inputValue && <SuggestionsListComponent />}
    </div>
  );
};

export default Autocomplete;
