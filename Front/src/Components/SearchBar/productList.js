
import React, { useEffect, useState,useContext } from 'react';
import './Productlist.css';
import linea from '../../imagenes/lineaBlanca.svg'
import like from '../../imagenes/like.svg'
import visitas from '../../imagenes/visitas.svg'
import {useRedirect} from '../../Hooks/useRedirect';


import ProductContext from '../../Contexts/ProductContext'

const ProductList = ({search,vegan,eco,cruelty}) => {
    const ProductDetailCxt = useContext(ProductContext)
   
    const redirect = useRedirect();

    const fetchData = async(search, setLoading, setProduct, setError) => {
        const url = `http://localhost:8888/searchProducts/?search=${search}&vegan=${vegan}&cruelty=${cruelty}&eco=${eco}`;
            setLoading(true);
            setError(null);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
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
   
    
    const PintarProducto = ({Brand,Name,Img, Price,onClick}) =>{
        return (
            <div id="ContenedorP" onClick={onClick}>
                <div>
                    <div id="circle"></div>
                    <img id="imgP" src={Img} alt={`${Name}`}  />
                </div>
                <div id="info">
                    <p id="brand">{Brand}</p>
                    <p id ="nameP">{Name}</p>
                    <img id="AddFav" src={like} alt="likeicon" ></img> 
                 
                    <p id="NumberLikes">{Math.floor(Math.random()*100) } </p> 
                    <img id="visitas" src={visitas} alt="visitas" ></img> 
                    <p id="NumberVisitas">{Math.floor(Math.random()*100) } </p> 
                    {/* <img id="linea" src={linea} alt="linea"></img> */}
                </div>
              
            </div>  
            
        )
    }
    const parseData = (productList) => {
        if (loading)
        return <p>Loading ...</p>
        else if (error)
        return <p>{error}</p>
        else
        return productList.map(product => {
            const {Id,Brand,Name,Price,Img, IdFav}= product
            
            return (<div key={Id} id={Id} >
                <PintarProducto 
                    onClick={(e)=>{
                        console.log("entra")
                        redirect("/Detail",e)
                        ProductDetailCxt.setIdProduct({ 
                            ...ProductDetailCxt,Id,IdFav,
                        });    
                    }} Brand={Brand} Name={Name} Price={Price} Img={Img} IdFav={IdFav} />
            </div>  )  
        })
                    
                    
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

