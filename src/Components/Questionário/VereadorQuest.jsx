import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "./ContextQuest";

const VereadorQuest = () => {
  const { vereador, setVereador } = useContext(Mycontext);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um vereador</p>
      <div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="setorial-select">
            <span className="label-text">Selecione um vereador:</span>
          </label>
          <select
            required
            id="vereador-select"
            className="select select-bordered w-[18rem]"
            value={vereador}
            onChange={(e) => setVereador(e.target.value)}
          >
            <option value="Calleri">Calleri</option>
            <option value="Gabigol">Gabigol</option>
            <option value="Yure Alberto">Yure Alberto</option>
          </select>
        </div>
        <div className="flex justify-center gap-10 mt-10 ">
          <Link to={-1}>
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Voltar
            </button>
          </Link>
          <Link to="/prefeito-quest">
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Avança
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VereadorQuest;
