import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  return (
    <nav className={`nav ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="logo">
        <a href="#mainSection"></a>
      </div>
      <div className="navAll">
        <div className="movil-title">
          <h2>Menu principal</h2>
          <FaTimes size={32} color="var(--logo)" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <div className="navLinks">
          <ul>
            <li onClick={() => setIsMenuOpen(false)}><a href="#mainSection">INICIO</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="#teamSection">PRODUCTOS</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="#DescriptionSection">MARCAS</a></li>
          </ul>
        </div>
      </div>

      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <AiOutlineMenu size={32} color="var(--text)" />
      </div>
    </nav>
  );
};

export default Header;