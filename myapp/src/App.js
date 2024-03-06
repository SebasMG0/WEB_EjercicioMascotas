import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import './App.css';

function CardGrid() {
  const [data, setData] = useState ([]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row',flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <div key={index} style={{ width: '18rem', margin: '10px', border: '1px solid', borderRadius: '5px', padding: '10px' }}>
          <img src={item.foto} alt={item.nombre} style={{ width: '100%' }} />
          <h2>{item.nombre}</h2>
          <p>{item.raza}</p>
          <Link to={`/${index}`} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Detalle</Link>
        </div>
      ))}
    </div>
  );
}

function Detail() {
  const [data, setData] = useState ([]);
  const { id } = useParams();

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const item = data[id];

  return item ? (
    <div style={{ width: '18rem', margin: '10px', border: '1px solid', borderRadius: '5px', padding: '10px' }}>
      <img src={item.foto} alt={item.nombre} style={{ width: '100%' }} />
      <h2>Id: {item.id}</h2>
      <h2>Nombre: {item.nombre}</h2>
      <h2>Raza: {item.raza}</h2>
      <div><h2>Descripción:</h2><p> {item.descripcion}</p></div>
    </div>
  ) : null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<Detail />} />
        <Route path="/" element={<CardGrid />} />
      </Routes>
    </Router>
  );
}

export default App;
