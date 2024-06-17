import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Mycontext } from "./ContextQuest";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Inicializando Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

// Instanciando o Firestore
const db = getFirestore(firebaseApp);

const PrefeitoQuest = () => {
  const { prefeito, setPrefeito } = useContext(Mycontext);
  const [prefeitos, setPrefeitos] = useState([]);

  // Função para carregar dados dos prefeitos do Firestore
  useEffect(() => {
    const carregarPrefeitos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ListaPrefeito"));
        const prefeitosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar prefeitos por nome antes de atualizar o estado
        prefeitosData.sort((a, b) => (a.nome < b.nome ? -1 : 1));

        setPrefeitos(prefeitosData);
      } catch (error) {
        console.error("Erro ao carregar prefeitos:", error);
      }
    };

    carregarPrefeitos();
  }, [db]);

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
          {prefeitos.map((prefeito) => (
            <MenuItem key={prefeito.id} value={prefeito.nome}>
              {prefeito.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Link to="/cadastro-prefeito">
        <button className="border hover:border hover:border-black text-black bg-slate-400">
          Adicionar um prefeito
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
            Avançar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PrefeitoQuest;
