import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add the VSL script dynamically
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    script.async = true;
    document.head.appendChild(script);

    // Timer for 3 minutes (180000ms)
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 180000); 

    // For testing purposes, uncomment below to show button quickly
    // const timer = setTimeout(() => setShowButton(true), 5000);

    return () => {
      clearTimeout(timer);
      if(document.head.contains(script)) {
         document.head.removeChild(script);
      }
    };
  }, []);

  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      {/* Alert Banner */}
      <div className="w-full bg-red-600 text-white text-center py-3 px-4 font-bold text-sm md:text-base shadow-md">
        ATENÇÃO: Devido a alta demanda essa página ira sair do ar no dia <span className="text-yellow-300">{today}</span>
      </div>

      <div className="flex-1 flex flex-col items-center py-8 px-4 w-full">
        <div className="max-w-2xl w-full text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-2 uppercase leading-tight">
            ESSE TRUQUE DO ABACATE ESTÁ MELHORANDO A DIABETES TIPO 2 DA POPULAÇÃO
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-gray-700">
            E o melhor de tudo totalmente natural sem quimica
          </h2>
        </div>

        {/* VSL Container */}
        <div className="w-full max-w-2xl shadow-xl rounded-lg overflow-hidden border-4 border-white bg-black">
           <div id="ifr_6963b277a0bc9c70579d8187_wrapper" style={{margin: '0 auto', width: '100%'}}> 
              <div style={{position: 'relative', padding: '133.33333333333331% 0 0 0'}} id="ifr_6963b277a0bc9c70579d8187_aspect"> 
                  <iframe 
                      frameBorder="0" 
                      allowFullScreen 
                      src="https://scripts.converteai.net/fd7cffcf-a128-4cf6-8573-7102145d7c17/players/6963b277a0bc9c70579d8187/v4/embed.html" 
                      id="ifr_6963b277a0bc9c70579d8187" 
                      style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                      referrerPolicy="origin"
                  ></iframe> 
              </div> 
           </div>
        </div>

        {/* Pulsing Button */}
        <div className="mt-8 h-20 flex items-center justify-center w-full">
          {showButton ? (
            <button
              onClick={() => navigate('/consulta')}
              className="bg-green-600 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg animate-pulse hover:bg-green-700 hover:scale-105 transition-transform duration-300 uppercase tracking-wide border-2 border-green-400"
            >
              QUERO MINHA CONSULTA GRATUITA
            </button>
          ) : (
             <p className="text-gray-400 text-sm animate-pulse">Aguarde o carregamento da oportunidade...</p>
          )}
        </div>

        <div className="mt-12 text-center text-gray-400 text-xs max-w-lg">
          <p>&copy; PROTOCOLO TRUQUE DO ABACATE 2026 Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};