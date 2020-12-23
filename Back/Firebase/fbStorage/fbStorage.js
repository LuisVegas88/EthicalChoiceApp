const { storage } = require("../fbConfig/firebase");
global.atob = require("atob");
global.XMLHttpRequest = require("xhr2");
const {login, register} =  require("../fbAuth/fbAuth");


async function handleLogin() {
    await login("luisvegasmenchero@gmail.com", "RetoTripulaciones2020");
}

function getDate(date = new Date()) {
    return (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`);
}

function FirebaseUpload (file) {
    return new Promise(async (resolve, reject) => {
        await handleLogin();
        let imgName = getDate();
        storage.ref(`images/`).child(imgName).putString(file, "data_url").then(async snapshot => {
             (await snapshot.ref.getDownloadURL());
        }).catch(e => reject(e));
    });
}


module.exports = FirebaseUpload;
