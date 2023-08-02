import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import ReactGA from 'react-ga';

ReactGA.initialize('G-CHMT10MRY2');

// Función para enviar la página actual a Google Analytics
const sendPageView = (location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router onUpdate={sendPageView}>
    <App />
  </Router>
);