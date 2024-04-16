import React from "react";
import { Link } from "react-router-dom";
const HomeQuest = () => {
  return (
    <div className="flex flex-col items-center justify-around">
      <div>
        <h1 className="text-center text-[2.2rem] text-zinc-600 uppercase">
          Pesquisa Eleitoral 2024
        </h1>
        <p className="text-center mt-5">Pesquisa eleições mariense 2024</p>
      </div>
      <Link to="/setorial-quest">
        <button className="bg-[#6C757D] hover:bg-[#343A40] text-white outline-none hover:border-none">
          Iniciar Pesquisa
        </button>
      </Link>
    </div>
  );
};

export default HomeQuest;
