import React from 'react'
import '../Signup/PopupLogin.css'
import IconClose from '../../imagenes/closeAdd.png';
import {
    Link
  } from "react-router-dom";
import Edit from './Edit.js';


const  ProfileEdit =()=> {
  
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
                   
                        <Link to="/">
                        <img id="iconClose" src={IconClose} alt={"cerrar"} /> 
                        </Link> 
                        <>
                        <Edit />
                        </>
                   
            </div>
        </div>
        

    );
  }
export default ProfileEdit;