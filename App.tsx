import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ChatPage } from './components/ChatPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consulta" element={<ChatPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;