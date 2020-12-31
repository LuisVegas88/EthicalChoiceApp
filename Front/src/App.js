
import  React from 'react';
import Home from './Components/Home/Home.js'
// import Register from './Components/Register/Register';
// import Google from './Components/GoogleOAuth/Google';
// import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';
import NavBar from './Components/NavTabBottom/NavBar.js';
import Toolbar from './Components/Toolbar/Toolbar.js';
import Getherbolarios from './Components/LogIn/ExampleFetch';
import Login from './Components/LogIn/LogIn';

const App = ()=> {
  return (
    // <NavigationContainer>
    <div className="App">
      <Toolbar />
      <Home />
      <NavBar className="NavBottom"/>
      <Getherbolarios />
      <Login />
      
      {/* <Register />
      <Google />
      <FirebaseUpload /> */}
    </div>
   
    // </NavigationContainer>
  );
}

export default App;
