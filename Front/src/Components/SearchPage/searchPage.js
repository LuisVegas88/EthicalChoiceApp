// import React, {useState} from 'react';
import SearchBar from '../SearchBar/searchBar';
// import ProductList from '../SearcherProducts/productList';

//import { useState } from "react"


// const SearchPage = () => {
//     const [input, setInput] = useState('');
//     // const [productList, setProductList] = useState();
//     const [name, setName] = useState("");
//     const [brand, setBrand] = useState("");

//     const useProducts = {
//         Name: name,
//         Brand: brand
//     }
//     console.log(useProducts);
    

//     const fetchData = async() => {

//         const url = `http:/localhost:8888/searchProducts`
//         const resp = await fetch(url, {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json"
//             }
//         })
//         .then(response => response.json())
//         .then(data => {

//             console.log(data);

//         })
//         // return resp; 
// }

   

//     const handleButton = (e) =>  {
//         e.preventDefault();
//         fetchData();
//     }

//     const SearchBar = () => {
    
//         return (
//             <div id="searcher">
//                 <input
//                     id="searchBar"
//                     value={ name }
//                     placeholder="Busca aquí"
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 < button onClick= { handleButton }>Buscar</button>
//             </div>
//         )


//     }

//     return (
//         <>
//         <SearchBar />
//         <ProductList />
//         </>
//     )
// }

// export default SearchPage;

const getProducts = () => {

    const fetchData = async () => {
        const url = `http://localhost:8888/searchProducts/?search= `;
        const resp = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        } )
        .catch((error) => {return console.log(error)})
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    return(
        <div className="botón-Herb">
        <SearchBar />
        <button onClick= {handleSubmit}>Buscar Productos</button>
        </div>
    )

}

export default getProducts