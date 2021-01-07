                                
import { useState } from 'react';
import Filter from '../Filter/Filter';
import SearchBar from '../SearchBar/searchBar';
import ProductList from '../SearcherProducts/productList';

const  GetProducts = () => {
    
    const [input, setInput] = useState("");
    const [vegan, setVegan] = useState(false);
    const [eco, setEco] = useState(false);
    const [cruelty, setCruelty] = useState(false);


    return(
        <div className="botón-Herb">
        <SearchBar input={input} setInput={setInput}/>
        <Filter 
            vegan ={vegan} setVegan ={setVegan}
            eco ={eco} setEco ={setEco}
            cruelty ={cruelty} setCruelty ={setCruelty} />
        <ProductList search={input} vegan={vegan} eco={eco} cruelty={cruelty}/>
        {/* <button onClick= {handleSubmit}>Buscar Productos</button> */}
        </div>
    )

}

export default GetProducts;