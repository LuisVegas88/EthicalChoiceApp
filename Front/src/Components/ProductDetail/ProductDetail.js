
import React ,{useState,useEffect} from 'react';
// import ProductContext from '../../Contexts/ProductContext'
import hoja from '../../imagenes/Hoja.svg';
import back from '../../imagenes/back.svg';
import fav from '../../imagenes/fav2.svg';
import line from '../../imagenes/line2.svg';
import './ProductDetail.css';
import { useRedirect } from '../../Hooks/useRedirect';
import {
    Accordion,
    AccordionItemState,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import ShowMoreText from 'react-show-more-text';


export const ProductDetail =()=>{
    
    const [productDetail, setProductDetail] = useState("")
    const redirect = useRedirect();
    // const {idProduct} = useContext(ProductContext)
    const idProduct=29
    // console.log(idProduct)
    const fetchData = async()=>{
        
        const url = `http://localhost:8888/searchProducts/details/?search=${idProduct}`;
            fetch (url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    if(data){
                       setProductDetail({
                            Name: data.Name,
                            Img: data.Img,
                            Brand: data.Brand,
                            Price: data.Price,
                            Description:data.Description,
                            Ingredients:data.Ingredients,
                            Sello:data.Sello 
                        })
                        console.log("Este es su producto:",productDetail)    
                    }
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
            <div id="ProductImg">
                 <img id="hoja" src={hoja} alt="Hoja"></img>
                <div id="circle2"></div>
                <img id="productimg" src={productDetail.Img} alt="producto"></img>

            </div>
            <div id="infoContainer">
                <div id="main">
                    <h1 id="brand2">{productDetail.Brand}</h1>
                    <h2 id="name">{productDetail.Name}</h2>
                    <p id="price"> {productDetail.Price}</p>
                    <p id="description">
                        <ShowMoreText
                            lines={4}
                            more='Show more'
                            less='Show less'
                            
                            className='content-css'
                            anchorClass='my-anchor-css-class'
                            expanded={false}
                         
                        >
                         {productDetail.Description}   
                        </ShowMoreText>
                    </p>
                    <img id="lin" src={line} alt="line"></img>  
                </div>
             
                <Accordion allowZeroExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h3 className="desplegable1">Ingredientes</h3>
                                <img id="line" src={line} alt="line"></img> 
                                <AccordionItemState>
                        {({ expanded }) => (expanded )}
                    </AccordionItemState>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p id="ingredients">{productDetail.Ingredients}</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                            <h3 className="desplegable2">Garantía ética </h3>
                            <img id="line" src={line} alt="line"></img> 
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p id="ingredients2">Sellos: {productDetail.Sello}</p>
                            <p id="ingredients">
                                <p>
                                Cruelty free: Un producto cruelty free significa que esta “libre de crueldad animal” o que el producto no ha sido testado en animales.  
                                </p>
                                <p>
                                Vegano: Este símbolo permite identificar a los consumidores productos libres de ingredientes de origen animal 
                                </p>
                                <p>
                                    Ecológico: Este sello garantiza que no hay sustancias, componentes, metales pesados, fenoles y pesticidas sospechosos de ser cancerígenos, prohibidos  y perjudiciales.
                                </p>
                            

                            </p>
                            <img id="line" src={line} alt="line"></img> 
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>  
            </div>   
                
        </div>
    )
}






