import React from 'react';
import {Popup} from 'react-leaflet';
import { useRedirect } from '../../Hooks/useRedirect';

const MarkerPopup = (props) => {
  const { Name,Address, Phone, Email } = props.data;
  const redirect = useRedirect();
  return  (<Popup>
    <div className='poup-text'>
        <h3>{Name}</h3>
        <p><strong>Dirección: </strong>{Address}</p>
        <p><strong>Phone: </strong>{Phone}</p>
        <p><strong>Email: </strong>{Email}</p>
        <buttom id="BtnShop" onClick={(e)=>redirect("/DetailShop")}>Ver tienda</buttom>
    </div>
  </Popup>);
};

export default MarkerPopup;
