import React from 'react';
import Toggle from 'react-toggle'
import Toogle from './toogle.css'

const Filter = ({vegan,setVegan, eco, setEco, cruelty, setCruelty}) =>{

    const handleVegan = (e) => {
        setVegan(e.target.checked)
    }

    const handleEco = (e) =>{
        setEco(e.target.checked)
    }

    const handleCruelty = (e) =>{
        setCruelty(e.target.checked)
    }

    return(
        <div id="Filters">
                <Toggle
                    className="toggle"
                    defaultChecked={vegan}
                    onChange={handleVegan} />
                <label htmlFor='Vegan'></label>
                <Toggle
                    className="toggle"
                    defaultChecked={eco}
                    onChange={handleEco} />
                <label htmlFor='Eco'></label>
                <Toggle
                    className="toggle"
                    defaultChecked={cruelty}
                    onChange={handleCruelty} />
                <label htmlFor='Cruelty'></label>
            <div id ="textFilters">
                <p id="vt">Vegan</p>
                <p id="et">Eco</p>
                <p id="ct">Cruelty-free</p> 
            </div>     
        </div>
        
    )
}

export default Filter
