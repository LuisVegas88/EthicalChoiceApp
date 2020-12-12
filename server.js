//////////DEPENDENCIAS////////////////
//////////Server/////////////////////
const express = require("express");
const server = express();
const cors = require("cors");
const myPublicFiles = express.static("../public");
const listeningPort = 8888;
////Others////
const mysql = require("mysql");
const fetch = require("node-fetch");
const crypto = require ("crypto");
const dotenv = require ("dotenv").config();
const cookieParser = require("cookie-parser");const bodyParser = require("body-parser");
const base64 = require("base-64");
const SECRET = process.env.SECRET_JWT;
const options = {

	"maxAge": 1000 * 60 * 15 * 4 * 24 * 15, // would expire after 15 days		////// OPTIONS DE JWT//////
	"httpOnly": true, // The cookie only accessible by the web server
	"signed": true // Indicates if the cookie should be signed
};

//////////MiddlewaresServer//////////////
server.use(myPublicFiles);
server.use(bodyParser.urlencoded({"extended":false}));
server.use(cors());

////Others Middlewares/////////
server.use(cors());
server.use(cookieParser(SECRET));
server.use(bodyParser.json());

///////////////////////////////////////////////JWT//////////////////////////////////////////////////////////
// const SECRET = crypto.randomBytes(80).toString("hex");

////COMPROBACIÓN DEL JWT/////
server.get("/jwt", (req, res) => {

	const Payload = {

		"userName": "Admin",
		"iat": new Date(),
		"role": "Admin",
		"ip": req.ip
	};
	const JWT = generateJWT(Payload);
	res.cookie("jwt", JWT, {"httpOnly": true});
	res.send("Hola Mundo");
});
/////todo OK¡(Comprobado)

//FUNCIONES PARA CODIFICACION JWT  (front-end)


function encodeBase64(string) {
	const encodedString = base64.encode(string);
	const parsedString = encodedString
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
	return parsedString;
}

function decodeBase64(base64String) {
	const decodedString = base64.decoded(base64String);
	return decodedString;
}

function generateJWT(Payload) {
	const header = {
		"alg": "HS256",
		"typ": "JWT"
	};
	const base64Payload = encodeBase64(JSON.stringify(Payload));
	const base64Header = encodeBase64(JSON.stringify(header));
	const signature = encodeBase64(hash(`${base64Header}.${base64Payload}`));
	const JWT = `${base64Header}.${base64Payload}.${signature}`;
	return JWT;
}

function hash(string) {
	const hashedString = crypto
		.createHmac("sha256", SECRET)
		.update(string)
		.digest("base64");
	return hashedString;
}

function verifyJWT(jwt) {
	const [header, payload, signature] = jwt.split(".");
	if (header && payload && signature) {
		const expectedSignature = encodeBase64(hash(`${header}.${payload}`));
		if (expectedSignature === signature) {
			return true;
		}
	}
	return false;
}

function getJWTInfo(jwt) {
	const [payload] = jwt.split(".")[1];
	if (payload) {
		try {
			const data = JSON.parse(decodeBase64(payload));
			return data;
		} catch (e) {
			return null;
		}
	}
	return null;
}
// FUNCIONES DE ENCRIPTACION DE CONTRASEÑA

function encryptPassword(string) {
	const salt = "";
	let saltedPassword = salt + string + salt;

}
//////////////////////////////////////////////////////////////////OAUTHs/////////////////////////////////////////////////////
/////////////////GOOGLE///////////////////////////
///endpoints////
server.get("/loginGoogle", (req, res) => {
	res.redirect(getGoogleAuthURL());
});

server.get("/loginG", async (req, res) => {
    console.log(req.query);
	if (req.query.code) {
        const requestCode = req.query.code
        if (requestCode){
        const userData = await getGoogleUser(req.query.code);
        console.log(userData);
        res.send(userData)
        // res.redirect("/"); A nuestra pagina
        }else{
            res.send({"msg": "Error"});
        }

	}
});
///////////////
const {google} = require("googleapis");

let GOOGLE_CLIENT_SECRET="SXcyjROrUcPU3AaUSPCrCFF2";
let GOOGLE_CLIENT_ID ="298704109696-uiv8f6d8j3bf84bevu7epha2o507dh5g.apps.googleusercontent.com";
const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	/*id_token
   * This is where Google will redirect the user after they
   * give permission to your application
   */
	"http://localhost:8888/login"
);
function getGoogleAuthURL() {
	/*
     * Generate a url that asks permissions to the user's email and profile
     */
	const scopes = [
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/userinfo.email",
	];

	return oauth2Client.generateAuthUrl({
		"access_type": "offline",
		"prompt": "consent",
		// If you only need one scope you can pass it as string
		"scope": scopes
	});
}

async function getGoogleUser(code) {
	if (code) {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		if (tokens.id_token && tokens.access_token) {
			// Fetch the user's profile with the access token 
			try {

				const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
					"headers": {
						"Authorization": `Bearer ${tokens.id_token}`
					}
				});
				const googleUser = await res.json();
				return googleUser;
			} catch (error) {
				
				console.log(error);
				
			}
		}
	}
	return null;
	
}
/////////////////FACEBOOK///////////////////////////
///endpoints////
server.get("/loginFacebook", (req, res) => {
    console.log(process.env.ID_FACEBOOK)
    const url = `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.ID_FACEBOOK}&redirect_uri=${"http://localhost:8888/loginFB"}&state=${crypto.randomBytes(16).toString("hex")}&Scope=pages_read_engagement`
    res.redirect(url);
});

server.get("/loginFB", (req, res) => {
    const {code} = req.query;
    console.log(code);
    fetch(`https://graph.facebook.com/v9.0/oauth/access_token?client_id=${process.env.ID_FACEBOOK}&redirect_uri=${"http://localhost:8888/loginFB"}&client_secret=${process.env.SECRET_FACEBOOK}&code=${code}`).then(res => res.json()).then(data => {
        console.log(data);
        if (data.access_token) {
            const input_token = data.access_token;
            const TOKEN = `${data.token_type} ${data.access_token}`;
            fetch(`https://graph.facebook.com/oauth/access_token?client_id=${process.env.ID_FACEBOOK}&client_secret=${process.env.SECRET_FACEBOOK}&grant_type=client_credentials`).then(res => res.json()).then(data => {
                const appToken = data.access_token;
                fetch(`https://graph.facebook.com/debug_token?input_token=${input_token}&access_token=${appToken}`).then(res => res.json()).then(data => {
                    console.log(data);
                    const person_id = data.user_id
                    fetch(`https://graph.facebook.com/v9.0/${person_id}/?access_token=${appToken}`).then(res => res.json()).then(data => {
                        console.log(data)
                        res.send(data)
                    });
                    // res.send(TOKEN);
                }).catch(e => console.error(e));
            });
        }
    }).catch(e => console.error(e));
    // res.send(code);
})

/////////////////////////////////////////////////////////////////DATABASE MYSQL//////////////////////////////////////////////////////////////////////
//////////////////////CONNECT SQL/////////////////////////////////////

let connection = mysql.createConnection({

	"host"     : process.env.HOST_SQL,
	"user"     : process.env.USER_SQL,
	"password" : process.env.PASSWORD_SQL,
	"database" : process.env.DATABASE_SQL
});
connection.connect(function(err) {
	if (err) {
		console.error(`error connecting: ${ err.stack}`);
		return;
	}

	console.log(`connected as id ${ connection.threadId}`);
});

//////////////////EndPoints SQL///////////////////
///REGISTER///
server.post("/register", (req, res) => {

	let newUser = req.body;
	console.log(newUser);

    if(newUser.Name && newUser.Email && newUser.Password){
        connection.query(`SELECT * FROM User WHERE Email = "${newUser.Email}";`, function (err, result){ 
			console.log(result)
            if(err){
                console.log(err);
                return;
			}
			
			if (!result.length){//Si buscamos el email y da un array vacio =>registramos user
				
                connection.query(`INSERT INTO User (Name,Password,Email,Avatar) VALUES ("${newUser.Name}","${newUser.Password}","${newUser.Email}","${newUser.Avatar}");`)
				
                const Payload = {
                    "userName": newUser.Name,
							"iat": new Date(),
							"role": "User",
							"ip": req.ip
						};
				
				res.cookie("jwt", generateJWT(Payload),options).send({"msg": "New user has been created."});
			}else{
                res.send("User name or Email already exists")
            }
		})	
	}else{
		res.send("Please, Complete Credentials");
		connection.end();
		
	}
	
})
///LOGIN///
server.post("/login", (req, res) => {
	 
	let userLogin = req.body;

	if(userLogin.Email && userLogin.Password){
		connection.query(`SELECT * FROM User WHERE Email = "${userLogin.Email}";`, function (err, result){
			if(err){
				console.log(err);
				return;
			}
			let queryResult = result[0];
			
			if (queryResult && queryResult.Password === userLogin.Password){
			
				const Payload = {
					"user": userLogin.Email,
					"iat": new Date(),
					"role": "User",
					"ip":req.ip
				};
				res.cookie("jwt", generateJWT(Payload),options).send({"msg":"Logged¡"});
			}else{
				res.send("Wrong credentials")
			}
			connection.end();
		});
	}
});
///SEARCHBAR PLANTEAMIENTO/// 
//-----> HAY QUE REVISAR PORQUE TENGO MOVIDAS CON EL DB Y NO SÉ LA ESTRUCTURA. 

server.get("/searchProducts", (req, res) => {
	let products = req.query // ---> LO HE VISTO POR INTERNET PERO NO SÉ SI SERÁ ASÍ.
	if (products === true) {
		connection.query(`SELECT * FROM Productos`, (err, res) => {
			if(err) {
				return err;
			} 

			let queryResProduct= res[0];

			if(queryResProduct === products){
				const stockProducts = {
					"marca":"",
					"producto":"",
					"detalles":""
				};

				res.send(stockProducts);
			}
		})
	}
});
//////////////////////////////////////////////
////////LISTENING PORT/////////

server.listen(listeningPort,() => {
    console.log(`Server Listening on port ${listeningPort}`);
})
