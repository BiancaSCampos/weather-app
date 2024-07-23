import Search from "./assets/svg/Search";
import Input from "./components/input/Input";
import Title from "./components/title/Title";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-400 h-full w-full flex flex-col items-center">
      <div className="lg:max-w-[30%]">
        <Title />
        <Input
          placeholder="Digite uma cidade"
          icon={<Search className=" w-full h-full " />}
        />
      </div>
    </div>
  );
};

export default App;
