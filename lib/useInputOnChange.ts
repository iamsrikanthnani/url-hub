import { useState } from "react";

type InputErrors = {
  [key: string]: string;
};

type OnChangeFunction = {
  e: React.ChangeEvent<HTMLInputElement>;
  setInputs: React.Dispatch<React.SetStateAction<any>>;
  setInputErrors: React.Dispatch<React.SetStateAction<any>>;
};

const useInputOnChange = ({
  e,
  setInputs,
  setInputErrors,
}: OnChangeFunction) => {
  const onChange = () => {
    const { name, value } = e.target;

    // Clear the error for the current input
    setInputErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));

    // Update the inputs state
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value.trimStart(),
    }));
  };

  return onChange;
};

export default useInputOnChange;
