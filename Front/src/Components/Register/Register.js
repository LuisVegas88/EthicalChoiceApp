import React ,{useState} from 'react';
// import { Link,Router } from 'react-router-dom';
import logoEmail from '../../imagenes/email.png';
import logoDoc from '../../imagenes/Document.png';
import logoPwd from '../../imagenes/pwd.png';
import logoGoogle from '../../imagenes/google.png';
import { useRedirect } from '../../Hooks/useRedirect';
import { Link } from 'react-router-dom';

const Register = () => {
    
    const redirect = useRedirect();
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    const useForm ={
        Email: email,
        Name: name,
        Surname: surname,
        Password: password,
    }
    console.log(useForm);

    
    
    const fecthData = async (e) =>{
        const url = 'http://localhost:8888/register';

        const res = await fetch (url, {
            method:"POST",
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(useForm)
        })
        .then(response => response.text())
        .then (data => {
            console.log(data);
        //   if(data===("User name or Email already exists")||("Usuario o Contraseña NO válidos")||("Please, Complete Credentials")){
        //     ;
        // }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        fecthData();
        redirect("/profile")
    }

    return (
        <>
            <div className ="mainContainer">
                <h3 id="miP">Mis datos</h3>
                <form  onSubmit ={handleRegister} >
                    
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


                    <button id="BtnRegister" type="submit" >Aceptar y Unirse</button>

                    <button id="BtnGoogle" onClick={() => {redirect("/")}}>
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