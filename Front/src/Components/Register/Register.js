import React ,{useState} from 'react';
// import { Link,Router } from 'react-router-dom';

const Register = () => {
    
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
        })


    }

    const handleRegister = (e) => {
        e.preventDefault();
        fecthData();
    }

    return (
        <>
            <h3 >Register</h3>

            <form >
                <label>Email</label>
                <input 
                    type="text"
                    placeholder="email"
                    name="email"
                    className="emailregister"
                    autoComplete="off"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <label>Name</label>
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="nameregister"
                    autoComplete="off"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                />
                <label>Surname</label>
                <input 
                    type="text"
                    placeholder="surname"
                    name="surname"
                    className="surnameregister"
                    value={ surname }
                    onChange={ (e) => setSurname(e.target.value) }
                />
                <label>Password</label>
                <input 
                    type="password"
                    placeholder="Password"
                    name="password2"
                    className="auth__input"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />


                <button
                    type="submit"
                    onClick = {handleRegister}
                >
                    Register
                </button>
                {/* <Router>
                    <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
                </Router> */}
                

            </form>
        </>
    )
}
export default Register;