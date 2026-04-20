import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';
import './Header.css';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <NavLink to="/" className="logo">
          <Stethoscope color="#0d9488" size={28} />
          MedBooking
        </NavLink>

        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            Doctors Catalog
          </NavLink>
          <NavLink to="/appointments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            My Appointments
          </NavLink>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};
