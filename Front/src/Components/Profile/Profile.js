import React, { useState } from 'react';
import './profile.css';
import profile from '../../imagenes/profile.jpg';
import editp from '../../imagenes/editp.svg';
import { useRedirect } from '../../Hooks/useRedirect';
import {Link} from "react-router-dom";




export const Profile = () => {

    const [userName, setUserName] = useState("");
    const [userSurname, setSurname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userImg, setUserImg] = useState("");

    const redirect = useRedirect();
    const fetchUser = () =>{
        const url ="http://localhost:8888/User"
        fetch(url, {
            credentials: "include"
          })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUserName(data[0].Name)
            setSurname(data[0].Surname)
            setUserEmail(data[0].Email)
            setUserImg(data[0].Avatar)
        })
    } 

    const fetchlogout = () =>{
        const url ="http://localhost:8888/logout"
        fetch(url, {
            credentials: 'include' 
          })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    } 
    fetchUser();
    const handleEdit = (e)=>{
        e.preventDefault();
       redirect("/editProfile")
    }
    
    const handleLogout = (e)=>{
        e.preventDefault();
        fetchlogout();
        redirect("/");
    }


    return (
        <div id="Perfil">
            <img id="FotoPerfil" src={userImg} alt="FotoPerfil"></img>
            <div id="DataUserP">
                <p id="Name">{userName}</p>
                    <p id="Surname">{userSurname}</p>
                    <p id="Email">{userEmail}</p>
            </div>
            <div className="edit">
            <img className="edit2" src={editp} onClick={handleEdit} alt="logoedit"></img>
            <img className="edit2" src={editp} onClick={handleEdit} alt="logoedit"></img>
            <img className="edit2" src={editp} onClick={handleEdit} alt="logoedit"></img>
            </div>
            <button id="Logout" onClick={handleLogout}> LOG OUT</button>  
    
        </div>
    )
}
