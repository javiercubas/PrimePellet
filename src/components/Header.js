import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import "./Header.css";
import { getProductores } from "../modelos/ProductorModel";
import { getMarcas } from "../modelos/MarcaModel";
import { getPartners } from "../modelos/PartnerModel";
import { getTiposProductos } from "../modelos/TipoProductoModel";
import PromoPopUp from "./PromoPopUp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubProductosOpen, setIsSubProductosOpen] = useState(false);
  const [isSubProductoresOpen, setIsSubProductoresOpen] = useState(false);
  const [isSubMarcasOpen, setIsSubMarcasOpen] = useState(false);
  const [isSubPartnersOpen, setIsSubPartnersOpen] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [productores, setProductores] = useState([]);
  const [partners, setPartners] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);

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

    getTiposProductos().then((tiposProductos) => {
      setTiposProductos(tiposProductos);
    });
  }, [isMenuOpen]);

  const handleSubmenuClick = (submenuState, setSubmenuState) => {
    if (window.innerWidth <= 1100) {
      setSubmenuState(!submenuState);
    }
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 1100) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Determina el elemento de título (a o div) según el ancho de la pantalla
  const TitleElement = window.innerWidth <= 1100 ? "div" : "a";

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <nav className={`nav ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="logo">
        <a href="/"></a>
      </div>
      <div className="navAll">
        <div className="movil-title">
          <h2>Menu principal</h2>
          <FaTimes size={32} color="var(--logo)" onClick={handleMenuClick} />
        </div>
        <div className="navLinks">
          <ul>
            <li><a href="/">INICIO</a></li>
            <li
              onClick={() => handleSubmenuClick(isSubProductosOpen, setIsSubProductosOpen)}
              onMouseEnter={() => setIsSubProductosOpen(true)}
              onMouseLeave={() => setIsSubProductosOpen(false)}
            >
              <TitleElement href="/productos">PRODUCTOS</TitleElement>
              {isSubProductosOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubProductosOpen(true)} onMouseLeave={() => setIsSubProductosOpen(false)}>
                  {tiposProductos.map(tipoProducto => (
                    <li key={tipoProducto.id}><a href={tipoProducto.url}>{tipoProducto.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              onClick={() => handleSubmenuClick(isSubProductoresOpen, setIsSubProductoresOpen)}
              onMouseEnter={() => setIsSubProductoresOpen(true)}
              onMouseLeave={() => setIsSubProductoresOpen(false)}
            >
              <TitleElement href="/productores">PRODUCTORES</TitleElement>
              {isSubProductoresOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubProductoresOpen(true)} onMouseLeave={() => setIsSubProductoresOpen(false)}>
                  {productores.map(productor => (
                    <li key={productor.id}><a href={`/productor/${productor.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{productor.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              onClick={() => handleSubmenuClick(isSubMarcasOpen, setIsSubMarcasOpen)}
              onMouseEnter={() => setIsSubMarcasOpen(true)}
              onMouseLeave={() => setIsSubMarcasOpen(false)}
            >
              <TitleElement href="/marcas">MARCAS</TitleElement>
              {isSubMarcasOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubMarcasOpen(true)} onMouseLeave={() => setIsSubMarcasOpen(false)}>
                  {marcas.map(marca => (
                    <li key={marca.id}><a href={`/marca/${marca.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{marca.nombre}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              onClick={() => handleSubmenuClick(isSubPartnersOpen, setIsSubPartnersOpen)}
              onMouseEnter={() => setIsSubPartnersOpen(true)}
              onMouseLeave={() => setIsSubPartnersOpen(false)}
            >
              <TitleElement href="/partners">PARTNERS</TitleElement>
              {isSubPartnersOpen && (
                <ul className="submenu" onMouseEnter={() => setIsSubPartnersOpen(true)} onMouseLeave={() => setIsSubPartnersOpen(false)}>
                  {partners.map(partner => (
                    <li key={partner.id}>
                      {partner.id == 1 ? <div onClick={handleShowPopup}>{partner.nombre}</div> : <a href={partner.url}>{partner.nombre}</a>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><a href="/sobre-nosotros">SOBRE NOSOTROS</a></li>
          </ul>
        </div>
      </div>

      {showPopup && <PromoPopUp onClose={() => {
        setShowPopup(false);
        document.body.style.overflow = 'unset';
      }} type={1} />}

      <div className="hamburger" onClick={handleMenuClick}>
        <AiOutlineMenu size={32} color="white" />
      </div>
    </nav>
  );
};

export default Header;