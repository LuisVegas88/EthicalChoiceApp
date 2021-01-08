import React, {useState} from 'react';
import {useRedirect} from '../../Hooks/useRedirect';
import './login.css';
import logoEmail from '../../imagenes/email.png';
import logoPwd from '../../imagenes/pwd.png';


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = {
        Email: email,
        HashPass: password
    }

    console.log(user);
    const Redirect = useRedirect();

   
    const fetchData = async (e) => {
        const url = 'http://localhost:8888/Login'
        const res = await fetch (url, {            
            method:"POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(user)
        })
        .then(res => res.text())
        .then (data => {
            console.log(data);
            if(data === "Logged¡"){
                console.log("FUNCIONA")
                Redirect("/profile")} 
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
     }
    

    return (
        <div id="log">
         <h3>Login</h3>
         <form className = "formLogIn"/>
          <input 
                type="text"
                placeholder="Email"
                name="email"
                className="login"
                autoComplete="off"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }/>
                <img src={logoEmail} alt={"logoemail"} id="logoEmail2"/>
            
            <input
                type="password"
                placeholder="Contraseña"
                name="password2"
                className="login"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }/>
                <img src={logoPwd} alt={"logoPwd"} id="logoPwd2"/>
            
            <button type="submit" className="submitlogin" onClick={handleSubmit}>Come in</button>
        </div>

    )
    

}
export default Login;