import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "./ContextQuest";

const PrefeitoQuest = () => {
  const { prefeito, setPrefeito } = useContext(Mycontext);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um prefeito</p>
      <div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="prefeito-select">
            <span className="label-text">Selecione um prefeito:</span>
          </label>
          <select
            required
            id="vereador-select"
            className="select select-bordered w-[18rem]"
            value={prefeito}
            onChange={(e) => setPrefeito(e.target.value)}
          >
            <option value="Cristiano Ronaldo">Cristiano Ronaldo</option>
            <option value="Mbappe">Mbappe</option>
            <option value="Messi">Messi</option>
          </select>
        </div>
        <div className="flex justify-center gap-10 mt-10 ">
          <Link to={-1}>
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Voltar
            </button>
          </Link>
          <Link to="/end-quest">
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Avança
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrefeitoQuest;
