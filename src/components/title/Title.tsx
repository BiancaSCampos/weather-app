import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/weather-animation.json";

const Title = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    
  };
  return (
    <div className="flex flex-col  h-fit  items-center mt-6 ">
      <Lottie options={defaultOptions} height={100} width={100}  />
      <p className=" text-[2rem] font-poppins font-normal text-white ">
        Previsão do Tempo
      </p>
    </div>
  );
};

export default Title;
