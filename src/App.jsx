import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Layout/Header';
import { Toast } from './components/UI/Toast';
import { CatalogPage } from './pages/CatalogPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <main className="container" style={{ padding: '2rem 1.5rem' }}>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/appointments" element={<MyAppointmentsPage />} />
          </Routes>
        </main>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
