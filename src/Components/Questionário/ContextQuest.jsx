import React, { createContext, useState } from "react";

export const Mycontext = createContext();

export const ProviderQuest = ({ children }) => {
  const [bairro, setBairro] = useState("Bairro1");
  const [vereador, setVereador] = useState("Calleri");
  const [prefeito, setPrefeito] = useState("Cristiano Ronaldo");

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
