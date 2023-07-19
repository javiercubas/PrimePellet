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
            <li onClick={() => setIsMenuOpen(false)}><a href="/">INICIO</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="/productos">PRODUCTOS</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="/productores">PRODUCTORES</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="/marcas">MARCAS</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="/blog">BLOG</a></li>
            <li onClick={() => setIsMenuOpen(false)}><a href="/quienes-somos">QUIENES SOMOS</a></li>
          </ul>
        </div>
      </div>

      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <AiOutlineMenu size={32} color="white" />
      </div>
    </nav>
  );
};

export default Header;