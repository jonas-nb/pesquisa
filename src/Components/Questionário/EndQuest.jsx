import React, { useContext } from "react";
import { Mycontext } from "./ContextQuest";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore";

// Inicializar Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

// Obtendo uma instância do Firestore
const db = getFirestore(firebaseApp);

const EndQuest = () => {
  const { prefeito, bairro, vereador } = useContext(Mycontext);
  const navigate = useNavigate();

  const saveDataCache = () => {
    const dataToSave = { prefeito, bairro, vereador };
    caches.open("pesquisaCache").then((cache) => {
      cache.put("/pesquisaData", new Response(JSON.stringify(dataToSave)));
    });
    alert("Pesquisa salva no cache do dispositivo.");
    navigate("/");
  };

  const saveDataFirebase = async () => {
    try {
      const cacheDataResponse = await caches.match("/pesquisaData");
      if (cacheDataResponse) {
        const cacheData = await cacheDataResponse.json();
        const useCollectionRef = collection(db, "PesquisaCandidatos");
        const docRef = await addDoc(useCollectionRef, cacheData);
        alert("Pesquisa concluída com sucesso");
        caches.delete("/pesquisaData");
        navigate("/");
        console.log("Documento adicionado com Id", docRef.id);
      } else {
        alert("Nenhum dado do cache encontrado para enviar para o Firebase.");
      }
    } catch (error) {
      alert("Algo deu errado");
      console.log("Erro ao adicionar documento", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Pesquisa concluída</p>
      <ul className="text-[1.2rem]">
        <li>
          <span className="font-extrabold">Bairro Selecionado:</span> {bairro}
        </li>
        <li>
          <span className="font-extrabold">Vereador Selecionado:</span>{" "}
          {vereador}
        </li>
        <li>
          <span className="font-extrabold">Prefeito Selecionado:</span>
          {prefeito}
        </li>
      </ul>
      <div className="flex justify-center gap-10 mt-10">
        <Link to={-1}>
          <button className="border hover:border hover:border-black text-black bg-slate-400">
            Voltar
          </button>
        </Link>

        <button
          onClick={() => {
            saveDataCache();
            saveDataFirebase();
          }}
          className="border hover:border hover:border-black text-black bg-slate-400"
        >
          Concluir
        </button>
      </div>
    </div>
  );
};

export default EndQuest;
