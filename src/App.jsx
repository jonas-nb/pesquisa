import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeQuest from "./Components/Questionário/HomeQuest";
import SetorialQuest from "./Components/Questionário/SetorialQuest";
import VereadorQuest from "./Components/Questionário/VereadorQuest";
import PrefeitoQuest from "./Components/Questionário/PrefeitoQuest";
import EndQuest from "./Components/Questionário/EndQuest";

import QuestionnaireConclusion from "./Components/Questionário/QuestionnaireConclusion";

const App = () => {
  return (
    <div className="m-auto w-screen h-screen flex justify-center border0">
      <Routes>
        <Route path="/" element={<HomeQuest />} />
        <Route path="/setorial-quest" element={<SetorialQuest />} />
        <Route path="/vereador-quest" element={<VereadorQuest />} />
        <Route path="/prefeito-quest" element={<PrefeitoQuest />} />
        <Route path="/end-quest" element={<EndQuest />} />
        <Route path="/final-pesquisa" element={<QuestionnaireConclusion />} />
      </Routes>
    </div>
  );
};

export default App;
