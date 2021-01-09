import React, { useState } from 'react';
import './SearchBar.css'
import iconoSearch from '../../imagenes/Iconosearch.svg'
// import filter from '../../imagenes/Filter.svg'


const SearchBar = ({input, setInput}) => {

    return (
        <div id="searcher">
            <img id="iconoSearch" src={iconoSearch} alt="IconoSearch"></img>
            {/* <img id="iconoFilter" src={filter} alt="IconoFilter" ></img> */}
            <input
                id="search"
                value={ input }
                placeholder="Busca aquí"
                onChange={(e) => setInput(e.target.value)}
            />
            {/* < button onClick={fetch}>Buscar</button> */}
        </div>
    );

}

export default SearchBar;

