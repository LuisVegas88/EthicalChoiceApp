
import React ,{useState,useEffect} from 'react';
// import ProductContext from '../../Contexts/ProductContext'
import hoja from '../../imagenes/Hoja.svg';
import back from '../../imagenes/back.svg';
import fav from '../../imagenes/fav2.svg'
import './ProductDetail.css';
import { useRedirect } from '../../Hooks/useRedirect';

export const ProductDetail =()=>{

    const [productDetail, setProductDetail] = useState({})
    const redirect = useRedirect();
    // const {idProduct} = useContext(ProductContext)
    const idProduct=150
    // console.log(idProduct)
    const fetchData = async()=>{
        
        const url = `http://localhost:8888/searchProducts/details/?search=${idProduct}`;
            fetch (url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.erro)
                        redirect("/search");
                    else
                        setProductDetail ({
                            Name: data.Name,
                            Img: data.Img,
                            Brand: data.Brand,
                            Price: data.Price,
                            Description:data.Description,
                            Ingredients:data.Ingredientes,
                            Sello:data.Sello 
                        })
                        console.log(`Este es us producto: ${productDetail}`)
                }) 
        
        
    }
    useEffect(() => {
       fetchData()
    }, []);
   
    return(
        <div id="productDetail">
            <div id="head">
                <img id="back" src={back} alt="goBack"></img>
                <img id="fav" src={fav} alt="fav"></img>
            </div>
            <img id="hoja" src={hoja} alt="Hoja"></img>

        </div>
    )
}
