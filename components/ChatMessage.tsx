import React from 'react';
import { Message, MessageType, Sender } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface ChatMessageProps {
  message: Message;
  onAudioEnded?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAudioEnded }) => {
  const isBot = message.sender === Sender.BOT;
  const isSystem = message.sender === Sender.SYSTEM;

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 px-4">
        <div className="bg-[#fff5c4] text-gray-800 text-xs sm:text-sm py-2 px-4 rounded shadow text-center border-l-4 border-yellow-400">
           {/* Allow HTML for bolding/breaks in system messages */}
           <div dangerouslySetInnerHTML={{ __html: message.content || '' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`
          relative max-w-[85%] sm:max-w-[70%] px-3 py-2 rounded-lg shadow-sm text-sm sm:text-base
          ${isBot ? 'bg-white rounded-tl-none text-gray-800' : 'bg-[#d9fdd3] rounded-tr-none text-gray-900'}
        `}
      >
        {/* Render Name for Bot */}
        {isBot && (
          <div className="text-xs text-[#008069] font-bold mb-1">DR Lair Ribeiro</div>
        )}

        {message.type === MessageType.TEXT && (
           <div className="whitespace-pre-wrap">{message.content}</div>
        )}

        {message.type === MessageType.IMAGE && message.mediaUrl && (
          <div className="mb-1">
             {message.content && <div className="mb-2 whitespace-pre-wrap">{message.content}</div>}
            <img src={message.mediaUrl} alt="Media" className="rounded-lg w-full h-auto object-cover max-h-[300px]" />
          </div>
        )}

        {message.type === MessageType.VIDEO && message.mediaUrl && (
          <div className="mb-1">
             {message.content && <div className="mb-2 whitespace-pre-wrap">{message.content}</div>}
             <video controls className="w-full rounded-lg" src={message.mediaUrl} />
          </div>
        )}

        {message.type === MessageType.AUDIO && message.mediaUrl && (
          <div>
            {message.content && <div className="mb-2 whitespace-pre-wrap">{message.content}</div>}
            <AudioPlayer src={message.mediaUrl} sender={message.sender === Sender.BOT ? 'bot' : 'user'} onEnded={onAudioEnded} />
          </div>
        )}

        {message.list && (
          <ul className="mt-2 space-y-1">
            {message.list.map((item, idx) => (
              <li key={idx} className="flex items-start">
                 {/* Checkmark or Bullet based on content provided */}
                 <span className="mr-2">{item.includes('✅') || item.includes('👉') || item.includes('🟡') ? '' : '•'}</span>
                 <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="text-[10px] text-gray-500 text-right mt-1 opacity-70 flex justify-end items-center gap-1">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {!isBot && (
            // Double check mark
            <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53bdeb]">
               <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.473-.018l5.358-7.717a.42.42 0 0 0-.08-.543z"/>
               <path fill="currentColor" d="M11.024 2.238l-.466-.363a.365.365 0 0 0-.512.063L4.68 8.799a.32.32 0 0 1-.484.033l-3.07-2.793a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l3.92 3.763c.143.14.361.125.473-.018l6.358-7.717a.42.42 0 0 0-.08-.543z"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};