import React, { useEffect, useState,useContext } from 'react';
import UserContext from "../../Contexts/userContext";
import linea from '../../imagenes/linea.png'
import like from '../../imagenes/like.svg'
import close from '../../imagenes/closeAdd.png'
import visitas from '../../imagenes/visitas.svg'
import Home from '../Home/Home'
import '../SearchBar/Productlist.css';
import {useRedirect} from '../../Hooks/useRedirect';
import ProductContext from '../../Contexts/ProductContext'


export const Favs = () =>{

    const {userInfo} = useContext(UserContext)
    console.log("ID Usuario",userInfo)
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const redirect = useRedirect();
    const ProductDetailCxt = useContext(ProductContext)
    // console.log("Context de ProductLis", ProductDetailCxt)
    

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

    const DeleteFav = async (IdFav)=>{
        return new Promise ((resolve)=>{
             const url = `http://localhost:8888/DeleteFav/?idfav=${IdFav}`
            fetch(url) 
            .then(response=>response.json())
            .then(data=> {
                console.log(data)
                resolve()
        })  
        })
       
            
    }

    const HandleDelete =(IdFav)=>{
        DeleteFav(IdFav)
            .then(()=>{
                fecthData(setLoading,setProductList,setError)
            })
        
    }
    
    const PintarProducto = ({Brand,Name,Img,onClick,IdFav}) =>{
        return (
            <div id="ContenedorP" >
                <div>
                    <div id="circle"onClick={onClick}></div>  
                    <img id="imgP" src={Img} alt={`${Name}`}  />
                </div>
                <div id="info2">
                    <p id="brand2">{Brand}</p>
                    <p id ="nameP2">{Name}</p>
                    <img id="AddFav2" src={like} alt="likeicon" ></img> 
                    <p id="NumberLikes2">{Math.floor(Math.random()*100) } </p> 
                    <img id="visitas2" src={visitas} alt="visitas" ></img> 
                    <p id="NumberVisitas2">{Math.floor(Math.random()*100) } </p> 
                      <img id="DeleteFav" src={close} alt="closeicon" onClick={()=>HandleDelete(IdFav)}></img> 
                                
                    <img id="linea2" src={linea} alt="linea"></img>
                
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
                const {Id,Name,Img,Brand,IdFav}= product
                console.log("INFO PRODUCTO",ProductDetailCxt)
                return (
                    <div key={Id} id={Id} >
                        <PintarProducto 
                            onClick={(e)=>{
                                redirect("/Detail",e)
                                ProductDetailCxt.setIdProduct({ 
                                    ...ProductDetailCxt,Id,IdFav
                                });    
                            }} Name={Name} Img={Img} Brand={Brand} IdFav={IdFav}  />
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