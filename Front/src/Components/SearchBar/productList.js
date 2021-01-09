
import React, { useEffect, useState } from 'react';
import './Productlist.css';
import linea from '../../imagenes/linea.png'
import like from '../../imagenes/like.svg'

const ProductList = ({search,vegan,eco,cruelty}) => {

    
    const fechFav = async() => {
        const url = `http://localhost:8888/AddFav`
        const resp = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
    })
    }
   

    const handleFav = (e) =>{
        e.preventDefault()
        fechFav()
    }

    const fetchData = async (search, setLoading, setProduct, setError) => {
        const url = `http://localhost:8888/searchProducts/?search=${search}&vegan=${vegan}&cruelty=${cruelty}&eco=${eco}`;
        setLoading(true);
        setError(null);
        const resp = await fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                setError(data.error)
            else
                setProduct(data);
            setLoading(false);
        } )
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }

    const parseData = (productList) => {
        if (loading)
            return <p>Loading ...</p>
        else if (error)
            return <p>{error}</p>
        else
            return productList.map(product => (
                
                    <div key={product.Id}>
                        <div id="ContenedorP">
                            <div id="circle"></div>
                            <img id="AddFav" src={like} alt="likeicon" onClick={handleFav}></img> 
                         
                            <img id="linea" src={linea} alt="linea"></img>
                            <p id="brand">{product.Brand}</p>
                            <p id ="nameP">{product.Name}</p>
                            <img id="imgP" src={product.Img} alt={`${product.Name}`} />
                        </div>    
                    </div>
                    
                
            ));
    }

    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        if (search.length > 2)
        {
            let timeout = setTimeout(() => {
                console.log("Nueva petición")
                fetchData(search, setLoading, setProductList, setError);
            }, 500);

            return () => {
                clearTimeout(timeout);
            }
        }
        
    }, [search,vegan,cruelty,eco])


    return (
        <div class="scrollbar" id="style-2">
            
            {parseData(productList)} 
            
        </div>
    )
}

export default ProductList;

