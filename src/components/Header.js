import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import "./Header.css";
import { getProductores } from "../modelos/ProductorModel";
import { getMarcas } from "../modelos/MarcaModel";
import { getPartners } from "../modelos/PartnerModel";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubProductosOpen, setIsSubProductosOpen] = useState(false);
  const [isSubProductoresOpen, setIsSubProductoresOpen] = useState(false);
  const [isSubMarcasOpen, setIsSubMarcasOpen] = useState(false);
  const [isSubPartnersOpen, setIsSubPartnersOpen] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [productores, setProductores] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }

    getMarcas().then((marcas) => {
      setMarcas(marcas);
    });

    getProductores().then((productores) => {
      setProductores(productores);
    });

    getPartners().then((partners) => {
      setPartners(partners);
    });
  }, [isMenuOpen]);

  return (
    <nav className={`nav ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="logo">
        <a href="/"></a>
      </div>
      <div className="navAll">
        <div className="movil-title">
          <h2>Menu principal</h2>
          <FaTimes size={32} color="var(--logo)" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <div className="navLinks">
          <ul>
            <li><a href="/">INICIO</a></li>
            <li
              onMouseEnter={() => setIsSubProductosOpen(true)}
              onMouseLeave={() => setIsSubProductosOpen(false)}
            >
              <a href="/productos">PRODUCTOS</a>
              {isSubProductosOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubProductosOpen(true)} onMouseLeave={() => setIsSubProductosOpen(false)}>
                  <li><a href="/productos/pellet">Pellet</a></li>
                  <li><a href="/productos/hueso">Hueso</a></li>
                  <li><a href="/productos/estufas">Estufas</a></li>
                  <li><a href="/productos/calderas">Calderas</a></li>
                  <li><a href="/productos/otros">Otros</a></li>
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => setIsSubProductoresOpen(true)}
              onMouseLeave={() => setIsSubProductoresOpen(false)}
            >
              <a href="/productores">PRODUCTORES</a>
              {isSubProductoresOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubProductoresOpen(true)} onMouseLeave={() => setIsSubProductoresOpen(false)}>
                  {productores.map(productor => (
                    <li key={productor.id}><a href={`/productor/${productor.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{productor.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => setIsSubMarcasOpen(true)}
              onMouseLeave={() => setIsSubMarcasOpen(false)}
            >
              <a href="/marcas">MARCAS</a>
              {isSubMarcasOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubMarcasOpen(true)} onMouseLeave={() => setIsSubMarcasOpen(false)}>
                  {marcas.map(marca => (
                    <li key={marca.id}><a href={`/marca/${marca.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{marca.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => setIsSubPartnersOpen(true)}
              onMouseLeave={() => setIsSubPartnersOpen(false)}
            >
              <a href="/partners">PARTNERS</a>
              {isSubPartnersOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubPartnersOpen(true)} onMouseLeave={() => setIsSubPartnersOpen(false)}>
                  {partners.map(partner => (
                    <li key={partner.id}><a href={`/partner/${partner.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{partner.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li><a href="/sobre-nosotros">SOBRE NOSOTROS</a></li>
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