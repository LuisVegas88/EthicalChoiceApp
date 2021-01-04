import React from 'react'
import './PopupLogin.css'
import IconClose from '../../imagenes/closeAdd.png';
import {
    Link
  } from "react-router-dom";
import Login from '../LogIn/LogIn';


function ModalL() {
  
    return (
        
        <div className="backgroundModal">
            <div
                className="modal"
                style={{
                    position: "absolute",
                    background: "#fff",
                    top: 205,
                    left: "10%",
                    right: "10%",
                    padding: 15,
                    border: "0.5px solid #444",
                    borderRadius: 10
                }}>
                   
                        <Link to="/signup">
                        <img id="iconClose" src={IconClose} alt={"cerrar"} /> 
                        </Link> 
                        <>
                        <Login />
                        </>
                   
            </div>
        </div>
        

    );
  }
  export default ModalL;