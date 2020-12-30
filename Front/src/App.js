
import  React from 'react';
import Home from './Components/Home/Home.js'
// import Register from './Components/Register/Register';
// import Google from './Components/GoogleOAuth/Google';
// import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';
import NavBottom from './Components/NavTabBottom/NavBottom.js';
import Toolbar from './Components/Toolbar/Toolbar.js';

const App = ()=> {
  return (
    // <NavigationContainer>
    <div className="App">
      <Toolbar />
      <Home />
      <NavBottom className="NavBottom"/>
      
      {/* <Register />
      <Google />
      <FirebaseUpload /> */}
    </div>
   
    // </NavigationContainer>
  );
}

export default App;
