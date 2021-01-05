import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { refreshTokenSetup } from '../../Hooks/refreshToken';
import logoGoogle from '../../imagenes/google.png';
import { useRedirect } from '../../Hooks/useRedirect';
import '../Signup/Signup.css'

const LoginGoogle = ()=> {
    const clientId ='298704109696-uiv8f6d8j3bf84bevu7epha2o507dh5g.apps.googleusercontent.com';
    const redirect = useRedirect();

    const onSuccess = (res) => {
      const user ={
          Email: res.profileObj.email,
          Name: res.profileObj.name,
          Surname: res.profileObj.familyName,
          Avatar: res.profileObj.imageUrl,
          Password: "Ab123"
      }
    console.log('Login Success: currentUser:', res.profileObj);
        const goo = async () => {
          const url = 'http://localhost:8888/register';

             await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then(response => response.text())
            .then(data => {
              if (!data === "User name or Email already exists" || !data === "Usuario o Contraseña NO válidos" || !data === "Please, Complete Credentials") {

                console.log(data);
              }
              else {
                console.log(data);
                console.log(`Welcome ${user.Name}`)
                redirect("/profile");
              }
            });
        }
    refreshTokenSetup(res);
    goo();
    }
    
  
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

   const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    
  });

  return (
    <button id="BtnGoogle2" 
        onClick={signIn} >
            <div id="textGoogle">
                        <p>Registrarse con </p> 
                        <img id="imgGoogle" src={logoGoogle} alt="imgGoogle" />
            </div>
    </button>
  );
}
export default LoginGoogle;