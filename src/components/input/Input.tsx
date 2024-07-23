import React, { ReactElement } from "react";
import Search from "../../assets/svg/Search";

interface InputProps {
    placeholder: string
    icon?: ReactElement
}

const Input = ({placeholder, icon}: InputProps) => {
  return (
    <div className="border-indigo-100 border h-fit w-full flex bg-white rounded-xl items-center justify-between p-1 mt-6  gap-0.5 shadow-md">
      <input
        placeholder={placeholder}
        className="w-full  font-poppins text-lg resize-none outline-none border-none  p-1 "
      />
      <div className=" h-[2rem] w-[2rem]">
       {icon}
      </div>
    </div>
  );
};

export default Input;
