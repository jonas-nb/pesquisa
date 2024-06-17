import React, { useContext, useState, useEffect } from "react";
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
  let [endState, setEndState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (bairro === "" || vereador === "" || prefeito === "") {
      setEndState(false);
    } else {
      setEndState(true);
    }
  }, [bairro, vereador, prefeito]); // Dependências do useEffect

  console.log(endState);

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
      <div>
        {endState === true ? (
          <div className="flex flex-col items-center ">
            <p className="text-[1.5rem] text-center font-bold p-1 mt-12">
              Pesquisa concluída com sucesso!
            </p>
            <ul className="text-[1.2rem] list-disc">
              <li>
                <div className="font-medium mt-5">Logradouro Selecionado</div>
                <div className="font-extrabold">{bairro}</div>
              </li>
              <li>
                <div className="font-medium">Vereador Selecionado</div>
                <div className="font-extrabold">{vereador}</div>
              </li>
              <li>
                <div className="font-medium">Prefeito Selecionado</div>
                <div className="font-extrabold">{prefeito}</div>
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
        ) : (
          <div className="flex flex-col justify-center items-center p-3 text-center text-red-500">
            <h1>Erro</h1>
            <p className="m-7">
              Existem campos em brancos na pesquisa por favor clicar no botão
              abaixo para reiniciar a mesma.
            </p>
            <Link to="/">
              <button className="border hover:border hover:border-black text-black bg-slate-400">
                Reiniciar Pesquisa
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndQuest;
