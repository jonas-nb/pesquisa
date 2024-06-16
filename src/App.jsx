import React, { useContext } from "react";

import { Mycontext } from "./Components/Questionário/ContextQuest";
import { Routes, Route } from "react-router-dom";
import HomeQuest from "./Components/Questionário/HomeQuest";
import SetorialQuest from "./Components/Questionário/SetorialQuest";
import VereadorQuest from "./Components/Questionário/VereadorQuest";
import PrefeitoQuest from "./Components/Questionário/PrefeitoQuest";
import EndQuest from "./Components/Questionário/EndQuest";
import CadastroLogradouro from "./Components/Cadastro/CadastroLogradouro";
import CadastroVereador from "./Components/Cadastro/CadastroVereador";
import CadastroPrefeito from "./Components/Cadastro/CadastroPrefeito";

const App = () => {
  return (
    <div className="m-auto w-screen h-screen flex justify-center border0">
      <Routes>
        <Route path="/" element={<HomeQuest />} />
        <Route path="/setorial-quest" element={<SetorialQuest />} />
        <Route path="/vereador-quest" element={<VereadorQuest />} />
        <Route path="/prefeito-quest" element={<PrefeitoQuest />} />
        <Route path="/end-quest" element={<EndQuest />} />
        <Route path="/cadastro-logradouro" element={<CadastroLogradouro />} />
        <Route path="/cadastro-vereador" element={<CadastroVereador />} />
        <Route path="/cadastro-prefeito" element={<CadastroPrefeito />} />
      </Routes>
    </div>
  );
};

export default App;
