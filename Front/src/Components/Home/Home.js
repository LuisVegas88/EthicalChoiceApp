import React from 'react';
import './home.css';
import GetProducts from '../SearchBar/searchPage';




const Home = () =>{
  
    const Quotes= (["Saber escoger es poder","Los animales no usan cosméticos", "Todo pequeño cambio hace la diferencia","Elige hacer lo correcto","El que elige bien, vive bien","El futuro es vegano"]);
    const Quote = Quotes[Math.floor(Math.random() * Quotes.length)];

    return (
        
        < div className="Fondo">
           
            <GetProducts />
           
            <p id="Quote">{Quote}</p>

        </div>
    )
}
export default Home;