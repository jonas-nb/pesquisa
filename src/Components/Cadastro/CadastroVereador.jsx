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

const CadastroVereador = () => {
  const [vereadorNome, setVereadorNome] = useState([]);
  const navigate = useNavigate();

  const postVereador = async (e) => {
    e.preventDefault();

    try {
      //Verifica o valor do campo antes de continuar
      let respostaSistema = confirm(
        `Confirmar nome do vereador(a): ${vereadorNome}`
      );

      if (respostaSistema) {
        // Adicionar um documento à coleção 'Vereadores'
        await addDoc(collection(db, "ListaVereadores"), {
          nome: vereadorNome,
        });

        // Limpar o campo depois de enviar
        setVereadorNome("");
        alert("Vereador cadastrado com sucesso!");

        // Redireciona para a página de Vereadorouro
        navigate("/vereador-quest");
      } else {
        alert("Vereadorouro não cadastrado");
        navigate("/cadastro-vereador");
      }
    } catch (error) {
      console.error("Erro ao cadastrar Vereadorouro: ", error);
      alert(
        "Ocorreu um erro ao cadastrar o Vereadorouro. Verifique a conexão de internet."
      );
    }
  };

  const handleChange = (e) => {
    setVereadorNome(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-[2.5rem] text-center">Cadastramento do Vereador</h1>
      <form
        onSubmit={postVereador}
        className="flex flex-col items-center gap-4"
      >
        <label
          htmlFor="Vereador"
          className="block text-gray-700 font-bold mb-2"
        >
          Nome do Vereador
        </label>
        <input
          type="text"
          id="Vereador"
          value={vereadorNome}
          onChange={handleChange}
          className="bg-white border border-gray-500 rounded px-2 py-1"
        />
        <button
          type="submit"
          className="border hover:border-black text-black bg-slate-400 px-4 py-2 rounded"
        >
          Cadastrar Vereador
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

export default CadastroVereador;
