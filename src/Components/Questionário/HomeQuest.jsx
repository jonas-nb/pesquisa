import React from "react";
import { Link } from "react-router-dom";
const HomeQuest = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div>
        <h1 className="text-center text-[1.8rem] text-zinc-600 uppercase p-5">
          Pesquisa Eleitoral 2024
        </h1>
        <p className="text-center mt-5">Pesquisa eleições mariense 2024</p>
      </div>
      <Link to="/setorial-quest">
        <button className="bg-[#6C757D] hover:bg-[#343A40] text-white outline-none hover:border-none">
          Iniciar Nova Pesquisa
        </button>
      </Link>
      <div>Versão 0.2.0 (beta)</div>
    </div>
  );
};

export default HomeQuest;
