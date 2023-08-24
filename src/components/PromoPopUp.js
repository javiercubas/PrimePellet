import React, { useState } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los íconos de flecha
import './FinalizaTuCompra.css';
import './Carousel.css'; // Asegúrate de tener los estilos del carrusel

const PromoPopUp = (props) => {
  const { onClose, type } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  let images = ['../../assets/estufa-de-pellet-pop-negra.png', '../../assets/estufa-de-pellet-slimquadro-blanca.png', type === 1 ? '../../assets/promo-thermorossi-3.png' : type === 3 ? '../../assets/promo-thermorossi-estufas.png' : '../../assets/promo-thermorossi-calderas.png']; // Reemplaza con tus imágenes

  if (type == 1 || type == 4) {
    images = images.slice(2, 3);
  }

  const closePopup = () => {
    onClose();
  };

  const showNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const showPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div id="popup-container" className="popup-container">
      <div className="popup-background"></div>
      <div className="finaliza-content" style={{ padding: 0 }}>
        <FaTimes className="finaliza-close-icon" onClick={closePopup} style={{ zIndex: 1000 }} />
        <div className="carousel">
          {images.map((image, index) => (
            <a
              key={index}
              href={index===2 ? 'tel:+34623190390' : `https://primepellet.es/${index === 0 ? 'estufa-de-pellet-pop-negra' : 'estufa-de-pellet-slimquadro-blanca'}`}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={image} alt={`Imagen ${index}`} />
            </a>
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow prev-arrow" onClick={showPrevSlide} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
            <FaArrowLeft />
          </button>
          <button className="carousel-arrow next-arrow" onClick={showNextSlide} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            <FaArrowRight />
          </button>
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoPopUp;