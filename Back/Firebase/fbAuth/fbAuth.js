const {auth} = require("../fbConfig/firebase");

function register(email, password) {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
    }).catch(e => console.log(e));
}


function login(email, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then(user => {
            resolve(user);
        }).catch(e => reject(e));
    });

}

module.exports = {register, login};