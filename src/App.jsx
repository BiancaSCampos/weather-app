
import Search from "./assets/svg/Search";
import DisplayCityCard from "./components/cards/displayCityCard/displayCityCard";
import Input from "./components/input/Input";
import Title from "./components/title/Title";


const App = () => {
 

  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-400 h-full  flex flex-col items-center">
      <div className="lg:max-w-[40%] md:max-w-[40%] sm:max-w-[40%] w-full p-5" >
        <Title />
        <Input
          placeholder="Digite uma cidade"
          icon={<Search className=" size-7 " />}
        
        />
        <DisplayCityCard/>
      </div>
    </div>
  );
};

export default App;
