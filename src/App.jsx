import Search from "./assets/svg/Search";
import DisplayCityCard from "./components/cards/displayCityCard/displayCityCard";
import Input from "./components/input/Input";
import Title from "./components/title/Title";
import { CityProvider } from "./utils/providers/cityContextProvider";


const App = () => {
  return (
    <CityProvider>
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-400 h-full flex flex-col items-center">
        <div className="lg:max-w-[30%] md:max-w-[40%] sm:max-w-[20%] w-full p-3">
          <Title />
          <Input
            placeholder="Digite uma cidade"
            icon={<Search className=" size-7 " />}
          />
          <DisplayCityCard  />

          <span className="w-full h-0.5 rounded-lg mt-5  bg-white block" />
        </div>
      </div>
    </CityProvider>
  );
};

export default App;
