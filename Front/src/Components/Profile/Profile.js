import React from 'react'
import './profile.css'
import profile from '../../imagenes/profile.jpg'
import { useRedirect } from '../../Hooks/useRedirect';

export const Profile = () => {
    const redirect = useRedirect();
    const handleEdit = (e)=>{
        e.preventDefault();
        redirect("/profile/edit")
    }
    return (
        <div id="Perfil">
           <img src={profile} alt="FotoPerfil"></img>
           <p>{}nombre</p>
           <p>{}apellido</p>
           <p>{}email</p>
           <button id="editName" onClick={handleEdit}>Editar</button>
           <button id="editSurname" onClick={handleEdit}>Editar</button>
           <button id="editEmail" onClick={handleEdit}>Editar</button>
        </div>
    )
}
