import React ,{useState} from 'react';
// import { Link,Router } from 'react-router-dom';
import logoEmail from '../../imagenes/email.png';
import logoDoc from '../../imagenes/Document.png';
import logoPwd from '../../imagenes/pwd.png';
import logoGoogle from '../../imagenes/google.png';
import { useRedirect } from '../../Hooks/useRedirect';
import { Link,useHistory } from 'react-router-dom';
import LoginGoogle from '../GoogleOAuth/Google'  

const Register = () => {
    const history=useHistory();
    const redirect = useRedirect();
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    const userForm ={
        Email: email,
        Name: name,
        Surname: surname,
        Password: password,
    }
    console.log(userForm);

    
    
    const fecthData = async (e) => {
        const url = 'http://localhost:8888/register';

        const res = await fetch (url, {
            method:"POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
        .then(response => response.text())
        .then(data =>{
            if(data==="User name or Email already exists"||data==="Usuario o Contraseña NO válidos"||data==="Please, Complete Credentials")
            {
                
                console.log(data)
            }
            else{
                console.log(data)
                
                redirect("/profile");
            }
        })
        
    }
    const loginGoogle = async(e) =>{
        const url = 'http://localhost:8888/loginGoogle'
        await fetch(url, {
            redirect: 'manual',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data=>{
            console.log(data)
            console.log(data.url)
            window.location.href=data.url
        })
    }
    const handleGoogle = (e) => {
        e.preventDefault()
        loginGoogle()
       
    }
    const handleRegister =(e) => {
        e.preventDefault();
        fecthData();
    }

    return (
        <>
            <div className ="mainContainer">
                <h3 id="miP">Mis datos</h3>
                <form >
                    
                    <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="emailregister"
                        autoComplete="off"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }/>
                    <img src={logoEmail} alt={"logoemail"} id="logoEmail"/>
                   
                    
                    <input 
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        className="nameregister"
                        autoComplete="off"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }/>
                    <img src={logoDoc} alt={"logoDoc"} id="logoDoc1"/>
                   
                    <input 
                        type="text"
                        placeholder="Apellido"
                        name="surname"
                        className="surnameregister"
                        value={ surname }
                        onChange={ (e) => setSurname(e.target.value) }/>
                    <img src={logoDoc} alt={"logoDoc"} id="logoDoc2"/>
                    
                    <input 
                        type="password"
                        placeholder="Contraseña"
                        name="password2"
                        className="auth__input"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }/>
                    <img src={logoPwd} alt={"logoPwd"} id="logoPwd"/>


                    <button id="BtnRegister" type="submit" onClick ={handleRegister}>Aceptar y Unirse</button>
                    <>
                        <LoginGoogle />
                    </>

                    <button id="BtnGoogle" onClick={handleGoogle}>
                        <div id="textGoogle">
                        <p>Registrarse con </p> 
                        <img id="imgGoogle" src={logoGoogle} alt="imgGoogle" />
                        </div>
                        </button>
                    {/* Redireccionar a Google Oauth */}
                    <Link id="Sesion" to={"/loginP"}>¿Ya tienes cuenta? Iniciar Sesion</Link>

                </form>
            </div>
        </>
    )
}
export default Register;