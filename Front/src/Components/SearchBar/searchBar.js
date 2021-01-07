import React, { useState } from 'react';


const SearchBar = ({input, setInput}) => {

    return (
        <div id="searcher">
            <input
                id="searchBar"
                value={ input }
                placeholder="Busca aquí"
                onChange={(e) => setInput(e.target.value)}
            />
            {/* < button onClick={fetch}>Buscar</button> */}
        </div>
    );

}

export default SearchBar;

