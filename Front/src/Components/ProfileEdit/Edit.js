import React, {useState,useContext} from 'react';
import {useRedirect} from '../../Hooks/useRedirect';
import '../LogIn/login.css';
import logoEmail from '../../imagenes/email.png';
import logoPwd from '../../imagenes/pwd.png';
import UserContext from "../../Contexts/userContext";


export const Edit = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    console.log(userInfo)
    const Redirect = useRedirect();
    
    const fetchEdit = async (e) => {
        console.log("nueva peticion")
        const url = "http://localhost:8888/User/Edit/"
        await fetch (url, {            
            method:"PUT",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                Name: userInfo.userName,
                Surname: userInfo.userSurname,
                Email: userInfo.userEmail,
            })
        })
        

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchEdit();
        Redirect("/profile")
     }
    
    return (
        <div id="log">
         <h3>Editar Perfil</h3>
         <form className = "formLogIn"/>
            <input 
                type="text"
                placeholder={userInfo.userName}
                name="Name"
                className="login"
                autoComplete="off"
                value={userInfo.userName}
                onChange={ (e) => setUserInfo({...userInfo, userName : e.target.value}) }/>
                <img src={logoEmail} alt={"logoemail"} id="logoEmail2"/>
        
            <input
                type="tex"
                placeholder={userInfo.userSurname}
                name="Surname"
                className="login"
                value={userInfo.userSurname}
                onChange={ (e) => setUserInfo({...userInfo, userSurname : e.target.value}) }/>
                <img src={logoPwd} alt={"logoPwd"} id="logoPwd2"/>
            
            <input
                type="tex"
                placeholder={setUserInfo.userEmail}
                name="Email"
                className="login"
                value={userInfo.userEmail}
                onChange={ (e) => setUserInfo({...userInfo,userEmail : e.target.value}) }/>
                <img src={logoPwd} alt={"logoPwd"} id="logoPwd2"/>
            
            <button type="submit" className="submitlogin" onClick={handleSubmit}>EDITAR</button>
        </div>

    )
    

}
export default Edit;