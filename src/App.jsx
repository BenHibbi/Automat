import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KapNumerikPage from './pages/KapNumerikPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kapnumerik" element={<KapNumerikPage />} />
      </Routes>
    </Router>
  );
}

export default App;
