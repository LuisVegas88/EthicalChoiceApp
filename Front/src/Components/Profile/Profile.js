import React, { useContext, useEffect, useState } from 'react';
import './profile.css';
import profile from '../../imagenes/profile.jpg';
import editp from '../../imagenes/editp.svg';
import { useRedirect } from '../../Hooks/useRedirect';
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/userContext";

export const Profile = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const redirect = useRedirect();
    const fetchUser = () => {
        
        if (!userInfo) {
            const url = "http://localhost:8888/User"
            fetch(url, {
                credentials: "include"
            })
            
                .then(response => response.json())
                .then(data => {
                    console.log("userData:", data)
                    if (data.error)
                        redirect("/signup");
                    else
                        setUserInfo({
                            userName: data[0].Name,
                            userSurname: data[0].Surname,
                            userEmail: data[0].Email,
                            userImg: data[0].Avatar
                        
                        })
                })
        }
    }

    const fetchlogout = () => {
        const url = "http://localhost:8888/logout"
        fetch(url, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUserInfo(null);
            })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        redirect("/editProfile")
    }

    const handleLogout = (e) => {
        e.preventDefault();
        fetchlogout();
        redirect("/");
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (userInfo) {
        return (
            <div id="Perfil">
                <img id="FotoPerfil" src={userInfo.userImg} alt="FotoPerfil"></img>
                <div id="DataUserP">
                    <p id="Name">{userInfo.userName}</p>
                    <p id="Surname">{userInfo.userSurname}</p>
                    <p id="Email">{userInfo.userEmail}</p>
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
    else
        return (
            <>
            </>
        )
}
