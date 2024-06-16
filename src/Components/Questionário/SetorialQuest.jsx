import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../Components/Questionário/ContextQuest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

//iniciando firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

//instanciando o firebase
const db = getFirestore(firebaseApp);

const SetorialQuest = () => {
  const { bairro, setBairro } = useContext(Mycontext);
  const [data, setData] = useState([]);

  //guarda a informação e faz op upload para api

  const handleChange = (e) => {
    setBairro(e.target.value);
  };

  //percorrendo as informações de logradouro na api para mostrar nas opções do menuItem
  useEffect(() => {
    const respostaDoLogradouro = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Logradouro"));
        setData(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    //chamada da função
    respostaDoLogradouro();
  }, []);
  const responseEndereco = data.map(({ endereco }) => endereco);

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
          {responseEndereco.map((endereco, i) => (
            <MenuItem value={endereco} key={i}>
              {endereco}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Link to="/cadastro-logradouro">
        <button className="border hover:border hover:border-black text-black bg-slate-400">
          Adcionar um logradouro
        </button>
      </Link>
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
