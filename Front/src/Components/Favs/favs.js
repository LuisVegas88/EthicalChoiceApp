import React, { useEffect, useState,useContext } from 'react';
import UserContext from "../../Contexts/userContext";
import linea from '../../imagenes/linea.png'
import like from '../../imagenes/like.svg'
import close from '../../imagenes/closeAdd.png'
import Home from '../Home/Home'
import '../SearchBar/Productlist.css';
import {useRedirect} from '../../Hooks/useRedirect';
import ProductContext from '../../Contexts/ProductContext'
export const Favs = () =>{

    const {userInfo} = useContext(UserContext)
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const redirect = useRedirect();
    const ProductDetailCxt = useContext(ProductContext)

    const fecthData = async (setLoading,setProduct,setError) =>{
        const url = `http://localhost:8888/Favs/?idUser=${userInfo}`
        setLoading(true);
        setError(null);
        fetch (url,{
            credentials:"include"
        })
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                if (data.error!==undefined){
                   setError(data.error) 
                   
                }
                else
                    setProduct(data);
                    setLoading(false);
            } )
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
        
    }

    
    const PintarProducto = ({Brand,Name,Img,onClick}) =>{
        return (
            <div id="ContenedorP" >
                <div id="circle"></div>
                <img id="AddFav" src={like} alt="likeicon" ></img> 
                <img id="DeleteFav" src={close} alt="closeicon" ></img> 
                            
                <img id="linea" src={linea} alt="linea"></img>
                <p id="brand">{Brand}</p>
                <p id ="nameP">{Name}</p>
                <img id="imgP" src={Img} alt={`${Name}`} onClick={onClick} />
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
                const {Id,Name,Img,Brand}= product
                
                return (
                    <div key={Id} id={Id} >
                        <PintarProducto 
                            onClick={(e)=>{
                                redirect("/Detail",e)
                                ProductDetailCxt.setIdProduct({ 
                                    ...ProductDetailCxt,Id
                                });    
                            }} Name={Name} Img={Img} Brand={Brand} />
                    </div>
    
                )  
            })  
    
        
    }
    
    useEffect(() => {
        setTimeout(()=>{fecthData(setLoading,setProductList,setError)},500);
        
    }, [])

    return(
        <div id="FondoFavs">
            <div id="ContainerBtnFavs">
                <button id="BtnFav">FAVORITOS</button>
                <button id= "BtnList">MI LISTA</button>
            </div>
            <div id="ContenedorFavs">
               <div class="scrollbar" id="style-2">
                {parseData(productList)} 
            </div>
            
            </div>
        </div> 
    )
   
    
}