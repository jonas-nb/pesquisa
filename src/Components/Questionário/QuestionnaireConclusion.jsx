import React, { useState, useEffect } from "react";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const QuestionnaireConclusion = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //redireciona para home page
  const navigate = useNavigate();
  function GoHomePage() {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="fade-in flex justify-center items-center flex-col gap-10">
          <h1 className="text-center">Dados salvos com sucesso!</h1>
          <div className="text-[10rem] flex items-center justify-center ">
            <FcApproval />
          </div>
          <button onClick={GoHomePage} className="custom-button">
            Concluir Pesquisa
          </button>
        </div>
      )}

      {/* Estilos para o efeito de carregamento e fade-in */}
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3; /* Light grey */
          border-top: 16px solid #8bc34a; /* Blue */
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .fade-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .custom-button {
          background-color: #f5f5f5; /* Light grey */
          color: #000; /* Black */
          border: 1px solid #ccc; /* Light grey border */
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .custom-button:hover {
          border: #8bc34a 1px solid;
          background-color: #8bc34a; /* Darker grey */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .custom-button:active {
          background-color: #d5d5d5; /* Even darker grey */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default QuestionnaireConclusion;
