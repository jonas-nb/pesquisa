import React, { useContext } from "react";
import { Mycontext } from "./ContextQuest";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

const EndQuest = () => {
  const { prefeito, bairro, vereador } = useContext(Mycontext);

  const db = getFirestore(firebaseApp);

  const useCollectionRef = collection(db, "PesquisaCandidatos");

  const navigate = useNavigate();

  const saveData = async () => {
    try {
      const docRef = await addDoc(useCollectionRef, {
        prefeito,
        bairro,
        vereador,
      });
      alert("Pesquisa concluida com sucesso");
      navigate("/");
      console.log("Documento adicionado com Id", docRef.id);
    } catch (error) {
      alert("Algo deu errado");
      console.log("Erro ao adcionar documentos", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[2.5rem] text-center">Pesquisa concluida</p>
      <ul className="text-[1.2rem]">
        <li>
          <span className="font-extrabold">Bairro Selecionado:</span> {bairro}
        </li>
        <li>
          <span className="font-extrabold">Vereador Selecionado:</span>{" "}
          {vereador}
        </li>
        <li>
          <span className="font-extrabold">Prefeito Selecionado:</span>{" "}
          {prefeito}
        </li>
      </ul>
      <div className="flex justify-center gap-10 mt-10 ">
        <Link to={-1}>
          <button className="border hover:border hover:border-black text-black bg-slate-400">
            Voltar
          </button>
        </Link>

        <button
          onClick={saveData}
          className="border hover:border hover:border-black text-black bg-slate-400"
        >
          Concluir
        </button>
      </div>
    </div>
  );
};

export default EndQuest;
