import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Producto from './pages/Producto';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/pellet-asturias-pack-72-uds" exact element={<Producto />} />
      </Routes>

    </>
  );
}

export default App;