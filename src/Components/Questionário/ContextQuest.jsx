import React, { createContext, useState } from "react";

export const Mycontext = createContext();

export const ProviderQuest = ({ children }) => {
  const [bairro, setBairro] = useState("");
  const [vereador, setVereador] = useState("");
  const [prefeito, setPrefeito] = useState("");

  //console para ver
  console.log(bairro, vereador, prefeito);
  return (
    <Mycontext.Provider
      value={{
        bairro,
        setBairro,
        vereador,
        setVereador,
        prefeito,
        setPrefeito,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};
