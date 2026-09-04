import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

import HomePage from './pages/HomePage';
import Patents from './pages/Patents';
import IndexedPage from './pages/Research';
import BooksPage from './pages/BooksPage';
import Aboutpage from './landing_page/aboutpage/Aboutpage';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="app-shell">
      <Navbar onSearchToggle={() => setIsSearchOpen(true)} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onSearchOpen={() => setIsSearchOpen(true)} />} />
          <Route path="/patents" element={<Patents />} />
          <Route path="/indexed" element={<IndexedPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/about" element={<Aboutpage />} />
        </Routes>
      </main>

      <Footer />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
