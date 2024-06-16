import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "./ContextQuest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PrefeitoQuest = () => {
  const { prefeito, setPrefeito } = useContext(Mycontext);

  const handleChange = (e) => {
    setPrefeito(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Selecionar um prefeito</p>
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="prefeito-select-label">Prefeito</InputLabel>
        <Select
          labelId="prefeito-select-label"
          id="prefeito-select"
          value={prefeito}
          label="Prefeito"
          onChange={handleChange}
          sx={{
            backgroundColor: "#f0f0f0", // Cor de fundo do Select
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Cor da borda ao focar
            },
          }}
        >
          <MenuItem value="Cristiano Ronaldo">Cristiano Ronaldo</MenuItem>
          <MenuItem value="Mbappe">Mbappe</MenuItem>
          <MenuItem value="Messi">Messi</MenuItem>
        </Select>
      </FormControl>
      <Link to="/cadastro-prefeito">
        <button className="border hover:border hover:border-black text-black bg-slate-400">
          Adcionar um prefeito
        </button>
      </Link>
      <div className="flex justify-center gap-10 mt-10">
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
  );
};

export default PrefeitoQuest;
