import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Iniciando Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
});

// Instanciando o Firebase
const db = getFirestore(firebaseApp);

const CadastroPrefeito = () => {
  const [prefeitoNome, setPrefeitoNome] = useState("");
  const navigate = useNavigate();

  const postPrefeito = async (e) => {
    e.preventDefault();

    try {
      // Verifica o valor do campo antes de continuar
      let respostaSistema = confirm(
        `Confirmar nome do prefeito(a): ${prefeitoNome}`
      );

      if (respostaSistema) {
        // Salvar no cache do dispositivo
        if ("caches" in window) {
          const dataToSave = { nome: prefeitoNome };
          caches.open("pesquisaCache").then((cache) => {
            cache.put(
              "/prefeitoData",
              new Response(JSON.stringify(dataToSave))
            );
          });
        }

        // Adicionar um documento à coleção 'Prefeito' no Firestore
        await addDoc(collection(db, "ListaPrefeito"), {
          nome: prefeitoNome,
        });

        // Limpar o campo depois de enviar
        setPrefeitoNome("");
        alert("Prefeito cadastrado com sucesso!");

        // Redireciona para a página de Prefeito
        navigate("/prefeito-quest");
      } else {
        alert("Prefeito não cadastrado");
        navigate("/cadastro-prefeito");
      }
    } catch (error) {
      console.error("Erro ao cadastrar Prefeito: ", error);
      alert(
        "Ocorreu um erro ao cadastrar o prefeito. Verifique a conexão de internet."
      );
    }
  };

  const handleChange = (e) => {
    setPrefeitoNome(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-[2.5rem] text-center">Cadastramento do Prefeito</h1>

      <form
        onSubmit={postPrefeito}
        className="flex flex-col items-center gap-4"
      >
        <label
          htmlFor="Prefeito"
          className="block text-gray-700 font-bold mb-2"
        >
          Nome do Prefeito
        </label>
        <input
          type="text"
          id="Prefeito"
          value={prefeitoNome}
          onChange={handleChange}
          className="bg-white border border-gray-500 rounded px-2 py-1"
        />
        <button
          type="submit"
          className="border hover:border-black text-black bg-slate-400 px-4 py-2 rounded"
        >
          Cadastrar Prefeito
        </button>
      </form>
      <Link to={-1}>
        <button className="border hover:border-black text-black bg-slate-400 px-4 py-2 rounded mt-4">
          Voltar
        </button>
      </Link>
    </div>
  );
};

export default CadastroPrefeito;
