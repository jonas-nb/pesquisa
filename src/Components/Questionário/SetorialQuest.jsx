import React, { useContext } from "react";
import { Select } from "@radix-ui/themes";
import { Mycontext } from "../../Components/Questionário/ContextQuest";
import { Link } from "react-router-dom";

const SetorialQuest = () => {
  const { bairro, setBairro } = useContext(Mycontext);

  // Função para lidar com a mudança de seleção

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um setor</p>
      <div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="setorial-select">
            <span className="label-text">Selecione um setor:</span>
          </label>
          <select
            required
            id="setorial-select"
            className="select select-bordered w-[18rem]"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          >
            <option value="Bairro1">Bairro 1</option>
            <option value="Bairro2">Bairro 2</option>
            <option value="Bairro3">Bairro 3</option>
          </select>
        </div>
        <div className="flex justify-center gap-10 mt-10 ">
          <Link to={-1}>
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Voltar
            </button>
          </Link>
          <Link to="/vereador-quest">
            <button className="border hover:border hover:border-black text-black bg-slate-400">
              Avança
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetorialQuest;
