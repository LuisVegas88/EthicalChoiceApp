import React, {useState } from 'react';
import Register from '../Register/Register';

import './Signup.css'


export const Signup = () =>{

    const [productList, setProductList] = useState([])

    return (
        
        <div className= "global">
            <Register value={ productList, setProductList}/>
        </div>
     
    )

}