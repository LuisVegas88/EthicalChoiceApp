import React, { useState } from 'react';
import './SearchBar.css'
import iconoSearch from '../../imagenes/Iconosearch.svg'
import filter from '../../imagenes/maps.svg'
import { Mapa } from '../Map/Map';
import {useRedirect} from '../../Hooks/useRedirect';

const SearchBar = ({input, setInput}) => {

    const redirect= useRedirect();
    return (
        <div id="searcher">
            <img id="iconoSearch" src={iconoSearch} alt="IconoSearch"></img>
            <img id="iconoFilter" src={filter} alt="maps" onClick={()=>{redirect("/map")}}></img>
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

