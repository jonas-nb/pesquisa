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

const VereadorQuest = () => {
  const { vereador, setVereador } = useContext(Mycontext);
  const [vereadores, setVereadores] = useState([]);

  // Função para carregar dados dos vereadores do Firestore
  useEffect(() => {
    const carregarVereadores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ListaVereadores"));
        const vereadoresData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar vereadores por nome antes de atualizar o estado
        vereadoresData.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        setVereadores(vereadoresData);
      } catch (error) {
        console.error("Erro ao carregar vereadores:", error);
      }
    };

    carregarVereadores();
  }, [db]);

  const responseVereador = vereadores.map(({ nome }) => nome);
  console.log(responseVereador);
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
          {vereadores.map((vereador) => (
            <MenuItem key={vereador.id} value={vereador.nome}>
              {vereador.nome}
            </MenuItem>
          ))}
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
            Avançar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VereadorQuest;
