import React from 'react';

const Filter = ({vegan,setVegan, eco, setEco, cruelty, setCruelty}) =>{

    const handleVegan = (e) => {
        setVegan(e.target.checked)
    }

    return(
        <div id="Filters">
            <input type="checkbox" checked={vegan} id="Vegan" onChange={handleVegan} />
            <label htmlFor="Vegan">Vegan</label>
            <input type="checkbox" id="Eco" value="Eco" />
            <label htmlFor="Eco">Eco</label>
            <input type="checkbox" id="Cruelty" value="Cruelty-free" />
            <label htmlFor="Cruelty">Cruelty-free</label>
        </div>
    )
}

export default Filter
