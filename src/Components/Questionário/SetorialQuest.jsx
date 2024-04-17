import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../Components/Questionário/ContextQuest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SetorialQuest = () => {
  const { bairro, setBairro } = useContext(Mycontext);

  const handleChange = (e) => {
    setBairro(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um setor</p>
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="setorial-select-label">Setor</InputLabel>
        <Select
          labelId="setorial-select-label"
          id="setorial-select"
          value={bairro}
          label="Setor"
          onChange={handleChange}
          sx={{
            backgroundColor: "#f0f0f0", // Cor de fundo do Select
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Cor da borda ao focar
            },
          }}
        >
          <MenuItem value="Bairro1">Bairro 1</MenuItem>
          <MenuItem value="Bairro2">Bairro 2</MenuItem>
          <MenuItem value="Bairro3">Bairro 3</MenuItem>
        </Select>
      </FormControl>
      <div className="flex justify-center gap-10 mt-10">
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
  );
};

export default SetorialQuest;
