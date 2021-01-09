import React, { useContext} from 'react'
import '../Signup/PopupLogin.css'
import IconClose from '../../imagenes/closeAdd.png';
import {
    Link
  } from "react-router-dom";
import Edit from './Edit.js';
import UserContext from "../../Contexts/userContext";


const  ProfileEdit =()=> {
    const { userInfo, setUserInfo } = useContext(UserContext);
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
                                <Edit value={ userInfo, setUserInfo}/>
                            
                        </>
                   
            </div>
        </div>
        

    );
  }
export default ProfileEdit;