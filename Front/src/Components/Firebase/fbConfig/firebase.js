import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCeLHZmyxbc5JCAT4-9BXoKceazdoJO4aY",
    authDomain: "ethicalchoice.firebaseapp.com",
    projectId: "ethicalchoice",
    storageBucket: "ethicalchoice.appspot.com",
    messagingSenderId: "298704109696",
    appId: "1:298704109696:web:8c151aad6a2e317713e665"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage};
export default firebase;
// Es lo mismo que export {storage, firebase as default}