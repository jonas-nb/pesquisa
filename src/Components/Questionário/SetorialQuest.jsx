import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../Components/Questionário/ContextQuest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Iniciando Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

// Instanciando o Firebase
const db = getFirestore(firebaseApp);

const SetorialQuest = () => {
  const { bairro, setBairro } = useContext(Mycontext);
  const [data, setData] = useState([]);

  // Guarda a informação e faz o upload para a API
  const handleChange = (e) => {
    setBairro(e.target.value);
  };

  // Função para carregar dados do cache
  const loadDataFromCache = async () => {
    if ("caches" in window) {
      const cache = await caches.open("pesquisaCache");
      const cachedResponse = await cache.match("/logradouroData");
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        setData(cachedData);
      }
    }
  };

  // Percorrendo as informações de logradouro na API para mostrar nas opções do MenuItem
  useEffect(() => {
    const respostaDoLogradouro = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ListaLogradouro"));
        const logradouroData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(logradouroData);

        // Salvar os dados no cache
        if ("caches" in window) {
          const cache = await caches.open("pesquisaCache");
          cache.put(
            "/logradouroData",
            new Response(JSON.stringify(logradouroData))
          );
        }
      } catch (error) {
        console.log(
          "Erro ao recuperar dados do Firebase, tentando carregar do cache:",
          error
        );
        // Tentar carregar do cache se falhar ao recuperar do Firebase
        loadDataFromCache();
      }
    };

    // Chamada da função
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
          Adicionar um logradouro
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
            Avançar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SetorialQuest;
