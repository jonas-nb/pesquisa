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

const CadastroLogradouro = () => {
  const [endLogradouro, setEndLogradouro] = useState("");
  const navigate = useNavigate();

  const postLogradouro = async (e) => {
    e.preventDefault();

    try {
      // Verifica o valor do campo antes de continuar
      let respostaSistema = confirm(`Confirmar logradouro: ${endLogradouro}`);

      if (respostaSistema) {
        // Salvar no cache do dispositivo
        if ("caches" in window) {
          const dataToSave = { endereco: endLogradouro };
          caches.open("pesquisaCache").then((cache) => {
            cache.put(
              "/pesquisaData",
              new Response(JSON.stringify(dataToSave))
            );
          });
        }

        // Adicionar um documento à coleção 'Logradouro' no Firestore
        await addDoc(collection(db, "Logradouro"), {
          endereco: endLogradouro,
        });

        // Limpar o campo depois de enviar
        setEndLogradouro("");
        alert("Logradouro cadastrado com sucesso!");

        // Redireciona para a página de logradouro
        navigate("/setorial-quest");
      } else {
        alert("Logradouro não cadastrado");
        navigate("/cadastro-logradouro");
      }
    } catch (error) {
      console.error("Erro ao cadastrar logradouro: ", error);
      alert(
        "Ocorreu um erro ao cadastrar o logradouro. Verifique a conexão de internet."
      );
    }
  };

  const handleChange = (e) => {
    setEndLogradouro(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-[2.5rem] text-center">Cadastramento do Bairro</h1>
      <form
        onSubmit={postLogradouro}
        className="flex flex-col items-center gap-4"
      >
        <label htmlFor="bairro" className="block text-gray-700 font-bold mb-2">
          Nome do Bairro
        </label>
        <input
          type="text"
          id="bairro"
          value={endLogradouro}
          onChange={handleChange}
          className="bg-white border border-gray-500 rounded px-2 py-1"
        />
        <button
          type="submit"
          className="border hover:border-black text-black bg-slate-400 px-4 py-2 rounded"
        >
          Cadastrar Bairro
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

export default CadastroLogradouro;
