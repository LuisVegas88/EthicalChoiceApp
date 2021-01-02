import React, {useState} from 'react';
import {useRedirect} from '../../Hooks/useRedirect';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = {
        Email: email,
        HashPass: password
    }

    console.log(user);
    const Redirect = useRedirect();

   
    const fetchData = async (e) => {
        const url = 'http://localhost:8888/Login';

        const res = await fetch (url, {
            method:"POST",
            headers: {
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Headers' : '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.text())
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
        <div className="log">
         <form className = "formLogIn"/>
          <label>Email</label>
             <input 
                type="text"
                name="email"
                id="email"
                className="elogIn"
                placeholder="name@example.com"
                value= {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                name="pass"
                id="pass"
                className="passlogIn"
                placeholder="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit" onClick={handleSubmit}>Come in</button>
        </div>

    )
    

}

export default Login;