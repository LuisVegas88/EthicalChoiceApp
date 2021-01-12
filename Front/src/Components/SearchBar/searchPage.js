                                
import { useState } from 'react';
import Filter from './Filter';
import SearchBar from './searchBar';
import ProductList from './productList';
import './SearchBar.css'
import {BrowserRouter as Router,Redirect} from "react-router-dom";


const  GetProducts = () => {
    
    const [input, setInput] = useState("");
    const [vegan, setVegan] = useState(false);
    const [eco, setEco] = useState(true);
    const [cruelty, setCruelty] = useState(false);


    return(

            <div className="SearchBar">
            <SearchBar  input={input} setInput={setInput}/>
                
            <Filter 
                vegan ={vegan} setVegan ={setVegan}
                eco ={eco} setEco ={setEco}
                cruelty ={cruelty} setCruelty ={setCruelty} />
            <ProductList search={input} vegan={vegan} eco={eco} cruelty={cruelty}/>
            </div>

    )

}

export default GetProducts;