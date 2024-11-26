import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NameModal from './components/NameModal';
import Home from './pages/Home';
import English from './pages/English';
import Math from './pages/Math';
import Game from './pages/Game';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NameModal />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/english" element={<English />} />
            <Route path="/math" element={<Math />} />
            <Route path="/game" element={<Game />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;