import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MoreVertical, Phone, Video, Paperclip, Camera, Mic } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ASSETS, SYMPTOMS_LIST, CAUSES_LIST, BENEFITS_LIST } from '../constants';
import { Message, MessageType, Sender, UserData } from '../types';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({ name: '', age: '', symptoms: '' });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Helper to add messages with a delay
  const addBotMessage = async (msg: Partial<Message>, delay = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: Sender.BOT,
      type: MessageType.TEXT,
      ...msg
    } as Message]);
  };

  const handleNextStep = async () => {
    switch (currentStep) {
      case 0: // Start
        setMessages([
          {
            id: 'sys-1',
            sender: Sender.SYSTEM,
            type: MessageType.TEXT,
            content: `✅ <strong>Parabéns, você foi selecionado (a)</strong><br/><br/>Atenção: Não saia desta página, pois o atendimento será reiniciado e você poderá perder o progresso atual. Fique até o final para realizar a consulta que vai te curar da Diabetes`
          }
        ]);
        await addBotMessage({ content: "Olá, tudo bem com você?" }, 1000);
        // Play first audio
        await new Promise(r => setTimeout(r, 500));
        setMessages(prev => [...prev, {
          id: 'audio-1',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[1]
        }]);
        // The flow halts here until audio 1 ends.
        break;

      case 1: // After Audio 1
        await addBotMessage({ 
          content: "Meu nome é Lair Ribeiro.\nSou médico nutrólogo, especialista em curar a Diabetes\n\nInclusive olha a minha reportagem que saiu mês passado 👇🏻👇🏻" 
        });
        await addBotMessage({
          type: MessageType.IMAGE,
          mediaUrl: ASSETS.reportagemImg
        });
        await addBotMessage({ content: "Qual é o seu primeiro nome?" });
        setCurrentStep(2); // Wait for name input
        break;

      case 3: // After Name Input
        await addBotMessage({ content: `E quantos anos você tem, ${userData.name}?` });
        setCurrentStep(4); // Wait for age input
        break;

      case 5: // After Age Input
        await addBotMessage({ content: `${userData.name}, vou te enviar um áudio para te explicar como funciona...` });
        setMessages(prev => [...prev, {
          id: 'audio-2',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[2]
        }]);
        // Halts for Audio 2
        break;

      case 6: // After Audio 2
        await addBotMessage({ 
          content: `${userData.name}, infelizmente a indústria farmacêutica tenta esconder isso de você…`,
          type: MessageType.IMAGE,
          mediaUrl: ASSETS.pharmaImg
        });
        setMessages(prev => [...prev, {
          id: 'audio-3',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[3]
        }]);
        // Halts for Audio 3
        break;

      case 7: // After Audio 3
        await addBotMessage({ content: `Para te enviar a melhor\nreceita, me diga ${userData.name}` });
        await addBotMessage({ 
          content: "Você sofre com\nalgum desses sintomas?",
          list: SYMPTOMS_LIST
        });
        setCurrentStep(8); // Wait for input
        break;
      
      case 9: // After Symptoms Input
        await addBotMessage({ content: `Veja bem, ${userData.name}` });
        await addBotMessage({ 
          content: `Com ${userData.age} anos, esses sintomas podem ter diversas causas...\n\nAs causas mais comuns são...`,
          list: CAUSES_LIST
        });
        await addBotMessage({ content: `${userData.name}, eu preciso te contar algo muito importante...` });
        await addBotMessage({ content: "Podemos continuar?" });
        setCurrentStep(10); // Show "Podemos continuar" button
        break;

      case 11: // After Button "Podemos continuar"
         await addBotMessage({ content: `${userData.name}, eu preciso que você preste muita atenção no que vou te falar...` });
         setMessages(prev => [...prev, {
          id: 'audio-4',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[4]
        }]);
        break;
      
      case 12: // After Audio 4
        setMessages(prev => [...prev, {
          id: 'audio-5',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[5]
        }]);
        break;
      
      case 13: // After Audio 5
        setMessages(prev => [...prev, {
          id: 'audio-6',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[6]
        }]);
        break;

      case 14: // After Audio 6
        setMessages(prev => [...prev, {
          id: 'audio-7',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[7]
        }]);
        break;
      
      case 15: // After Audio 7
        await addBotMessage({ content: `${userData.name}, gostaria de tratar seus sintomas com a medicina alternativa?` });
        setCurrentStep(16); // Button "EU QUERO TRATAR"
        break;

      case 17: // After Button "Eu quero tratar"
        await addBotMessage({ content: `${userData.name}, deixa eu te mostrar alguns casos parecidos com o seu...` });
        await addBotMessage({ 
          content: "A Odete venceu a diabetes e eliminou 21KGs utilizando o protocolo de tratamento personalizado que enviei para ela",
          type: MessageType.IMAGE,
          mediaUrl: ASSETS.odeteImg
        });
        await addBotMessage({ 
          content: "E a Maria conseguiu eliminar a diabetes tipo 2, deixando para trás as picadas no dedo e o uso de remédios....",
          type: MessageType.VIDEO,
          mediaUrl: ASSETS.mariaVideo
        });
        await addBotMessage({ content: `${userData.name}, eu tenho certeza que você vai ter resultados incríveis como elas tiveram!` });
        await addBotMessage({ content: "Gostaria de ter esses resultados?" });
        setCurrentStep(18); // Button "SIM EU QUERO"
        break;

      case 19: // After Button "SIM EU QUERO"
        await addBotMessage({ content: "Sabe o que todas elas tem em comum?" });
        await addBotMessage({ content: 'Todas elas aplicaram um Protocolo criado por mim...\nEu chamo ele de "Protocolo Truque do Abacate"' });
        setMessages(prev => [...prev, {
          id: 'audio-8',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[8]
        }]);
        break;
      
      case 20: // After Audio 8
        setMessages(prev => [...prev, {
          id: 'audio-9',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[9]
        }]);
        break;

      case 21: // After Audio 9
        await addBotMessage({ 
          content: "Veja os principais benefícios do Protocolo Truque do Abacate…",
          list: BENEFITS_LIST
        });
        setMessages(prev => [...prev, {
          id: 'audio-10',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[10]
        }]);
        break;

      case 22: // After Audio 10
        await addBotMessage({ content: `${userData.name}, você gostaria de ter todos os benefícios do Protocolo Truque do Abacate?` });
        setCurrentStep(23); // Button "SIM EU QUERO"
        break;

      case 24: // After Button "SIM EU QUERO"
         await addBotMessage({ content: `${userData.name}, parabéns pela sua decisão!` });
         await addBotMessage({ content: `Quando a gente chega nos ${userData.age} anos é muito importante cuidar da nossa saúde!` });
         
         // Start Audio chain 11-16
         setMessages(prev => [...prev, {
          id: 'audio-11',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[11]
        }]);
        break;

      case 25: // After Audio 11
         setMessages(prev => [...prev, {
          id: 'audio-12',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[12]
        }]);
        break;
      case 26: // After Audio 12
         setMessages(prev => [...prev, {
          id: 'audio-13',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[13]
        }]);
        break;
      case 27: // After Audio 13
         setMessages(prev => [...prev, {
          id: 'audio-14',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[14]
        }]);
        break;
      case 28: // After Audio 14
         setMessages(prev => [...prev, {
          id: 'audio-15',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[15]
        }]);
        break;
      case 29: // After Audio 15
         setMessages(prev => [...prev, {
          id: 'audio-16',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[16]
        }]);
        break;
      
      case 30: // After Audio 16
        await addBotMessage({ content: `${userData.name}, eu confio tanto na medicina alternativa que eu tenho uma proposta para te fazer...` });
        setMessages(prev => [...prev, {
          id: 'audio-17',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[17]
        }]);
        break;

      case 31: // After Audio 17
         setMessages(prev => [...prev, {
          id: 'audio-18',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[18]
        }]);
        break;
      case 32: // After Audio 18
         setMessages(prev => [...prev, {
          id: 'audio-19',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[19]
        }]);
        break;
      case 33: // After Audio 19
         setMessages(prev => [...prev, {
          id: 'audio-20',
          sender: Sender.BOT,
          type: MessageType.AUDIO,
          mediaUrl: ASSETS.audios[20]
        }]);
        break;

      case 34: // After Audio 20
        await addBotMessage({ content: `${userData.name}, estou ansioso para aplicarmos o protocolo juntos e com Deus nos abençoando 🙏` });
        await addBotMessage({ content: "Para garantir a sua vaga,\nclique no botão abaixo." });
        setCurrentStep(35); // Final Button
        break;
    }
  };

  // Triggers Step 0 on load
  useEffect(() => {
    handleNextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAudioEnded = () => {
    // Determine next step based on current audio
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.type === MessageType.AUDIO) {
       // Logic to map current state to next state
       if (currentStep === 0) setCurrentStep(1);
       else if (currentStep === 5) setCurrentStep(6);
       else if (currentStep === 6) setCurrentStep(7);
       else if (currentStep === 11) setCurrentStep(12);
       else if (currentStep === 12) setCurrentStep(13);
       else if (currentStep === 13) setCurrentStep(14);
       else if (currentStep === 14) setCurrentStep(15);
       else if (currentStep === 19) setCurrentStep(20);
       else if (currentStep === 20) setCurrentStep(21);
       else if (currentStep === 21) setCurrentStep(22);
       else if (currentStep === 24) setCurrentStep(25);
       else if (currentStep === 25) setCurrentStep(26);
       else if (currentStep === 26) setCurrentStep(27);
       else if (currentStep === 27) setCurrentStep(28);
       else if (currentStep === 28) setCurrentStep(29);
       else if (currentStep === 29) setCurrentStep(30);
       else if (currentStep === 30) setCurrentStep(31);
       else if (currentStep === 31) setCurrentStep(32);
       else if (currentStep === 32) setCurrentStep(33);
       else if (currentStep === 33) setCurrentStep(34);
    }
  };

  // Watch for step changes triggered by Audio Ended or User Input
  useEffect(() => {
    if (currentStep !== 0) {
        handleNextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleUserInput = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: Sender.USER,
      type: MessageType.TEXT,
      content: inputValue
    }]);

    if (currentStep === 2) {
      setUserData(prev => ({ ...prev, name: inputValue }));
      setInputValue('');
      setCurrentStep(3);
    } else if (currentStep === 4) {
      setUserData(prev => ({ ...prev, age: inputValue }));
      setInputValue('');
      setCurrentStep(5);
    } else if (currentStep === 8) {
      setUserData(prev => ({ ...prev, symptoms: inputValue }));
      setInputValue('');
      setCurrentStep(9);
    }
  };

  const handleButtonClick = (action: string) => {
    // Simulate user clicking a predefined answer
    setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: Sender.USER,
        type: MessageType.TEXT,
        content: action
    }]);

    if (currentStep === 10) setCurrentStep(11);
    else if (currentStep === 16) setCurrentStep(17);
    else if (currentStep === 18) setCurrentStep(19);
    else if (currentStep === 23) setCurrentStep(24);
    else if (currentStep === 35) {
        // Redirect or final Action
        window.location.href = "https://checkout.example.com"; // Replace with checkout
    }
  };

  const renderInputArea = () => {
    if (isTyping) {
        return <div className="p-4 text-center text-gray-500 text-sm animate-pulse">DR Lair Ribeiro digitando...</div>;
    }

    if ([2, 4, 8].includes(currentStep)) {
      return (
        <div className="p-2 bg-[#f0f2f5] flex items-center gap-2">
          <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-2">
             <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                placeholder="Digite sua mensagem"
                className="flex-1 outline-none text-gray-700"
             />
          </div>
          <button 
            onClick={handleUserInput}
            className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white"
          >
             <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
             </svg>
          </button>
        </div>
      );
    }

    // Buttons
    if (currentStep === 10) {
        return <div className="p-4"><button onClick={() => handleButtonClick("PODEMOS CONTINUAR DOUTOR")} className="w-full bg-[#008069] text-white py-3 rounded-lg font-bold shadow hover:bg-[#006a57]">PODEMOS CONTINUAR DOUTOR</button></div>
    }
    if (currentStep === 16) {
        return <div className="p-4"><button onClick={() => handleButtonClick("EU QUERO TRATAR MEUS SINTOMAS")} className="w-full bg-[#008069] text-white py-3 rounded-lg font-bold shadow hover:bg-[#006a57]">EU QUERO TRATAR MEUS SINTOMAS</button></div>
    }
    if (currentStep === 18 || currentStep === 23) {
        return <div className="p-4"><button onClick={() => handleButtonClick("SIM EU QUERO")} className="w-full bg-[#008069] text-white py-3 rounded-lg font-bold shadow hover:bg-[#006a57]">SIM EU QUERO</button></div>
    }
    if (currentStep === 35) {
        return <div className="p-4"><button onClick={() => handleButtonClick("QUERO COMEÇAR AGORA!")} className="w-full bg-green-500 hover:bg-green-600 animate-pulse text-white py-4 rounded-lg font-bold shadow text-lg uppercase">QUERO COMEÇAR AGORA!</button></div>
    }

    return null; // No input while listening to audio
  };

  return (
    <div className="flex flex-col h-screen bg-[#efeae2] max-w-lg mx-auto shadow-2xl overflow-hidden relative font-poppins">
      
      {/* WhatsApp Header */}
      <div className="bg-[#008069] p-3 flex items-center text-white shrink-0 z-10 shadow-md">
        <ArrowLeft className="mr-2" size={24} />
        <img 
            src={ASSETS.profilePic} 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3 object-cover border border-white/20"
        />
        <div className="flex-1">
            <h1 className="font-bold text-base leading-tight">DR Lair Ribeiro</h1>
            <p className="text-xs text-green-100">Online</p>
        </div>
        <div className="flex gap-4 mr-2">
            <Video size={22} />
            <Phone size={20} />
            <MoreVertical size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-repeat"
        style={{ backgroundImage: "url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')", backgroundSize: "400px" }}
      >
         {messages.map((msg) => (
            <ChatMessage 
                key={msg.id} 
                message={msg} 
                onAudioEnded={handleAudioEnded}
            />
         ))}
         <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      {renderInputArea()}

    </div>
  );
};