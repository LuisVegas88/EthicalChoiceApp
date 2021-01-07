
import  React from 'react';
import Home from './Components/Home/Home.js'
// import Register from './Components/Register/Register';
// import Google from './Components/GoogleOAuth/Google';
// import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';
import NavBar from './Components/NavTabBottom/NavBar.js';
import Toolbar from './Components/Toolbar/Toolbar.js';
import Getherbolarios from './Components/LogIn/ExampleFetch';
import Login from './Components/LogIn/LogIn';
<<<<<<< HEAD
import Register from './Components/Register/Register.js';
//import SearchPage from './Components/SearchPage/searchPage';
import GetProducts from './Components/SearchPage/searchPage';
=======
import Register from './Components/Register/Register'

>>>>>>> 85eab1ed6bd1724f2aedcf706b551eadb41bf473
const App = ()=> {
  return (
    // <NavigationContainer>
    <div className="App">
      <Toolbar />
      <Home />
      <NavBar className="NavBottom"/>
<<<<<<< HEAD
      <Getherbolarios />
      <Login />
      <Register />
      <GetProducts />
      
     
      {/* <Google />
      <FirebaseUpload />  */}
=======
      

      
>>>>>>> 85eab1ed6bd1724f2aedcf706b551eadb41bf473
    </div>
   
    // </NavigationContainer>
  );
}

export default App;
