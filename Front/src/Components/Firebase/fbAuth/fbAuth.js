import {auth} from "../fbConfig/firebase";

function register(email, password) {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
        console.log(user);
    }).catch(e => console.log(e));
}


function login(email, password) {
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password).then(user => {
        console.log(user);
    }).catch(e => console.log(e));
}

export {register, login};