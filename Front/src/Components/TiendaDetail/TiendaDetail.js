import React from 'react';
import Tienda from '../../imagenes/DetalleTienda2.png'
import '../../App.css'
import IconClose from '../../imagenes/closeAdd.png';
import { useRedirect } from '../../Hooks/useRedirect';

const TiendaDetail=()=>{
    const redirect = useRedirect();

    const handleBack=(e)=>{
        e.preventDefault();
        redirect("/map")
    }
    return(
        <>
        <img id="Shop"src={Tienda} alt="Detalle Tienda"></img>
        <img id="iconClose2" src={IconClose} alt={"cerrar"} onClick={handleBack}/> 
        </>
    )
}
export default TiendaDetail;
