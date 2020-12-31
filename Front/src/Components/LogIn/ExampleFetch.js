//import React from 'react';



const Getherbolarios = () => {

    const fetchData = async (e) => {
       
        const url = `http://localhost:8888/searchRetailer`;
        const resp = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        } )
    
        return resp;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    return(
        <div className="botón-Herb">
        <button onClick= {handleSubmit}>Buscar</button>
        </div>
    )
}

// const Login = () => {

//     const [formValues, handleInputChange] = useForm({
//         email: "",
//         password:""
//     })

//     const {email, password} = formValues;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchLogin();
//     };

//     const {url, fetchLogi} = useEndPoints();
//     const {data} = useFetch(`${url}`);

//     return (
//         <div className="log">
//             <form onSubmit={handleSubmit} className = "formLogIn"/>
//             <label>Email</label>
//             <input 
//                 type="text"
//                 name="email"
//                 className="elogIn"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={handleInputChange}
//             />
//             <label>Password</label>
//             <input
//                 type="password"
//                 name="pass"
//                 className="passlogIn"
//                 placeholder="contraseña"
//                 value={password}
//                 onChange={handleInputChange}
//             />
//             <button type="submit" className="submit" onClick={() => redirect("/")}>Come in</button>
//         </div>

//     )
// }

export default Getherbolarios;