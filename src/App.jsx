import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KapNumerikPage from './pages/KapNumerikPage';
import DevisPage from './pages/DevisPage';
import ShowroomPage from './pages/ShowroomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kapnumerik" element={<KapNumerikPage />} />
        <Route path="/devis" element={<DevisPage />} />
        <Route path="/showroom" element={<ShowroomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
