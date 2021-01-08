
import  React, {Context, useState} from 'react';
import Home from './Components/Home/Home.js'
// import Register from './Components/Register/Register';
// import Google from './Components/GoogleOAuth/Google';
// import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';
import NavBar from './Components/NavTabBottom/NavBar.js';

import Getherbolarios from './Components/LogIn/ExampleFetch';
import Login from './Components/LogIn/LogIn';
import Register from './Components/Register/Register'
import GetProducts from './Components/SearchPage/searchPage.js';
import {UserProvider} from "./Contexts/userContext";


const App = ()=> {
  const [userInfo, setUserInfo] = useState(null);
  // const context = useContext(contextValue)
  return (
    // <NavigationContainer>

    <div className="App">
      <Home />
      <UserProvider value={{userInfo, setUserInfo}}>
        <NavBar className="NavBottom"/>
      </UserProvider>
      <GetProducts />
      
    </div>
   
    // </NavigationContainer>
  );
}

export default App;
