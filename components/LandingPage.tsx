import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Maria Silva', city: 'São Paulo, SP' },
  { name: 'Ana Souza', city: 'Rio de Janeiro, RJ' },
  { name: 'Josefa Oliveira', city: 'Salvador, BA' },
  { name: 'Francisca Santos', city: 'Belo Horizonte, MG' },
  { name: 'Antônia Lima', city: 'Fortaleza, CE' },
  { name: 'Adriana Pereira', city: 'Curitiba, PR' },
  { name: 'Lúcia Ferreira', city: 'Recife, PE' },
  { name: 'Márcia Rodrigues', city: 'Porto Alegre, RS' },
  { name: 'Sandra Costa', city: 'Manaus, AM' },
  { name: 'Patrícia Alves', city: 'Brasília, DF' }
];

export const LandingPage: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{ name: string, city: string } | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
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

    return () => {
      clearTimeout(timer);
      if(document.head.contains(script)) {
         document.head.removeChild(script);
      }
    };
  }, []);

  // Logic for Social Proof Popup
  useEffect(() => {
    const showRandomNotification = () => {
      const random = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setCurrentNotification(random);
      setIsNotificationVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 4000);
    };

    // Initial delay
    const initialDelay = setTimeout(showRandomNotification, 3000);

    // Loop every 10 seconds
    const interval = setInterval(showRandomNotification, 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins relative overflow-x-hidden">
      
      {/* Social Proof Popup - Top Right, Extra Small */}
      <div 
        className={`fixed top-2 right-2 z-50 transition-all duration-500 transform ${isNotificationVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}
      >
        {currentNotification && (
          <div className="bg-white/95 backdrop-blur-sm shadow-sm rounded p-1.5 border border-gray-100 flex items-center gap-1.5 max-w-[160px]">
            <div className="bg-green-100 p-0.5 rounded-full shrink-0">
              <CheckCircle size={10} className="text-green-600" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-gray-800 leading-none mb-0.5">{currentNotification.name}</p>
              <p className="text-[7px] text-gray-500 leading-none">
                de {currentNotification.city} <span className="text-green-600 font-semibold">recebeu...</span>
              </p>
            </div>
          </div>
        )}
      </div>

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
        <div className="w-full max-w-2xl shadow-xl rounded-lg overflow-hidden border-4 border-white bg-black relative z-10">
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