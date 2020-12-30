
import  React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import Home from './Components/Home/Home.js'
import Register from './Components/Register/Register';
import Google from './Components/GoogleOAuth/Google';
import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';

const App = ()=> {
  return (
    // <NavigationContainer>
    <div className="App">
      <Home />
      {/* <Register />
      <Google />
      <FirebaseUpload /> */}
    </div>
    // </NavigationContainer>
  );
}

export default App;
