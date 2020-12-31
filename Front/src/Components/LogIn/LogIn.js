import React, {Component} from 'react';
import useFetch from '../../Hooks/useFetch';

const Login = () => {

    const [formValues, handleInputChange] = useForm({
        email: "",
        password:""
    })

    const {email, password} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLogin();
    };

    const {url, fetchLogi} = useEndPoints();
    const {data} = useFetch(`${url}`);

    return (
        <div className="log">
            <form onSubmit={handleSubmit} className = "formLogIn"/>
            <label>Email</label>
            <input 
                type="text"
                name="email"
                className="elogIn"
                placeholder="name@example.com"
                value={email}
                onChange={handleInputChange}
            />
            <label>Password</label>
            <input
                type="password"
                name="pass"
                className="passlogIn"
                placeholder="contraseña"
                value={password}
                onChange={handleInputChange}
            />
            <button type="submit" className="submit" onClick={() => redirect("/")}>Come in</button>
        </div>

    )
}