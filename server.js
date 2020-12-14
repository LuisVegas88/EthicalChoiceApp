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
const Facebook = require("./lib/OauthFacebook");
const facebook = new Facebook();

//////////MiddlewaresServer//////////////
server.use(myPublicFiles);
server.use(bodyParser.urlencoded({"extended":false}));
server.use(cors());

////Others Middlewares/////////
server.use(cors());
server.use(cookieParser(SECRET));
server.use(bodyParser.json());

////////////////////////////////////////////VALIDATORS//////////////////////////////////////////////////////
function EmailValidator(Email) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(Email);
}

function PasswordValidator(Password) {
	let PasswordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{4,16}$/; 
	//La contraseña debe tener al entre 4 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.Puede tener otros símbolos.
    return PasswordRegex.test(Password);
}

function CredentialsValidator(Email, Password){
    return (EmailValidator(Email) && PasswordValidator(Password));
}


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

server.get("/login", async (req, res) => {
    console.log(req.query);
	if (req.query.code) {
        const requestCode = req.query.code
        if (requestCode){
        const userData = await getGoogleUser(req.query.code);
        console.log(userData);
        res.send(userData)
        // res.redirect("/"); A nuestra pagina de Perfil o favorito
        }else{
            res.send({"msg": "Error"});
        }

	}
});
///////////////
const {google} = require("googleapis");
const { query } = require("express");
const { CLIENT_RENEG_WINDOW } = require("tls");

let GOOGLE_CLIENT_SECRET="SXcyjROrUcPU3AaUSPCrCFF2";
let GOOGLE_CLIENT_ID ="298704109696-uiv8f6d8j3bf84bevu7epha2o507dh5g.apps.googleusercontent.com";
const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
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
   res.redirect(facebook.getRedirectUrl());
});

server.get("/loginFB", async (req, res) => {

	const Token = await (facebook.getOauthToken(req.query.code, req.query.state));
    const data = await facebook.getUserInfo(Token, ["name", "email"])
    
	const {id, name, email} = data;
	
	res.send(data);

    console.log("facebook data: " ,data);

});

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
		let validated = CredentialsValidator(newUser.Email, newUser.Password);
		if(validated){
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
			res.send("Usuario o Contraseña NO válidos")
		}	
	}else{
		res.send("Please, Complete Credentials");
		connection.end();
		
	}
	
})
///LOGIN///
server.post("/NormalLogin", (req, res) => {
	 
	let userLogin = req.body;

	if(userLogin.Email && userLogin.Password){
		connection.query(`SELECT * FROM User WHERE Email = "${userLogin.Email}";`,(err, result) => {
			if(err){
				console.log(err);
				return;
			}
			let queryResult = result[0];
			
			if (queryResult && queryResult.Password === userLogin.Password){
			
				const Payload = {
					"Email": userLogin.Email,
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
//////////////////QUERY/////////////////////////////////////////////-

function SQLquery(string, options = {}) {
	return new Promise((resolve, reject) => {
		connection.query(string, options, (err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
}

///SEARCH PRODUCTS/// 

// server.get("/searchProducts/Vegan", (req, res) => {
// 	SQLquery("SELECT * FROM Products WHERE Vegan = ?", [req.body.Vegan])
// 		.then(
// 			(result)=>{
				
// 				console.log(result);
// 				res.send(result)
			
// 			})
// 			connection.end();	
// })
// server.get("/searchProducts/Cruelty", (req, res) => {
// 	SQLquery("SELECT * FROM Products WHERE Cruelty_free = ?", [req.body.Cruelty])
// 		.then(
// 			(result)=>{
				
// 				console.log(result);
// 				res.send(result)
			
// 			})
// 			connection.end();	
// })

server.get("/searchProducts", (req, res) => {
	const {search, vegan, cruelty} = req.query;
	SQLquery(`SELECT * FROM Products WHERE (Name LIKE ? OR Brand LIKE ? OR Category LIKE ? ) ${vegan ? "AND Vegan = 1" : ""} ${cruelty ? "AND Cruelty_free = 1" : ""}`, [search, search, search])
		.then(
			(result)=>{
				
				console.log(result);
				res.send(result)
			
			})
			connection.end();	
})

// server.get("/searchProducts",(req,res) =>{
// 		const Term = req.query
// 		if()
// 		SQLquery("SELECT * FROM Products WHERE Brand = ? OR Name = ? OR Category = ?",[Term,Term,Term])
// 			.then(
// 				(result)=>{
// 					console.log(result);
// 					res.send(result)
// 				})
// 		connection.end();
	
// })


//////////////////////////////////////////////
////////LISTENING PORT/////////

server.listen(listeningPort,() => {
    console.log(`Server Listening on port ${listeningPort}`);
})
