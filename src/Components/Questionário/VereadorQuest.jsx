import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Mycontext } from "./ContextQuest";

const VereadorQuest = () => {
  const { vereador, setVereador } = useContext(Mycontext);

  const handleChange = (e) => {
    setVereador(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um vereador</p>
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="vereador-select-label">Vereador</InputLabel>
        <Select
          labelId="vereador-select-label"
          id="vereador-select"
          value={vereador}
          label="Vereador"
          onChange={handleChange}
          sx={{
            backgroundColor: "#f0f0f0", // Cor de fundo do Select
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Cor da borda ao focar
            },
          }}
        >
          <MenuItem value="Calleri">Calleri</MenuItem>
          <MenuItem value="Gabigol">Gabigol</MenuItem>
          <MenuItem value="Yure Alberto">Yure Alberto</MenuItem>
        </Select>
      </FormControl>
      <div className="flex justify-center gap-10 mt-10">
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
  );
};

export default VereadorQuest;
