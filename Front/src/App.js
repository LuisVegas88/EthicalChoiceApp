import './App.css';
import Register from './Components/Register/Register';
import Google from './Components/GoogleOAuth/Google';
import FirebaseUpload from './Components/Firebase/fbStorage/fbStorage.js';

function App() {
  return (
    <div className="App">
      <Register />
      <Google />
      <FirebaseUpload />
    </div>
  );
}

export default App;
