//////////DEPENDENCIAS////////////////
//////////Server/////////////////////
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors({
	origin:"http://localhost:3000", 
	credentials:true,
}));
const myPublicFiles = express.static("../public");
const listeningPort = 8888;
////Others////
const mysql = require("mysql");
const fetch = require("node-fetch");
const crypto = require("crypto");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser"); const bodyParser = require("body-parser");
const base64 = require("base-64");
const FirebaseUpload = require("./Firebase/fbStorage/fbStorage");
const Multer = require("multer");
const SECRET = process.env.SECRET_JWT;
const options = {
	"maxAge": 1000 * 60 * 15 * 4 * 24 * 15, // would expire after 15 days		////// OPTIONS DE JWT//////
	"httpOnly": true, // The cookie only accessible by the web server
	"signed": false // Indicates if the cookie should be signed
};
const Facebook = require("./lib/OauthFacebook");
const facebook = new Facebook();
const JWT = require("./lib/JWT.js");

//////////MiddlewaresServer//////////////
server.use(myPublicFiles);
server.use(bodyParser.urlencoded({ "extended": false }));


////Others Middlewares/////////

server.use(cookieParser());
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

function CredentialsValidator(Email, Password) {
	return (EmailValidator(Email) && PasswordValidator(Password));
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
		if (requestCode) {
			const userData = await getGoogleUser(req.query.code)
			if (userData) {
				// res.send(userData)
				console.log(userData);
				const { id, email, name, family_name, picture } = userData;
				const Validated = EmailValidator(email);
				if (Validated) {
					let connection = openDB();
					connection.query(`SELECT * FROM User WHERE Email = "${email}";`, (err, result) => {
						if (err) {
							throw eror
						}
						if (!result.length) {
							connection.query(`INSERT INTO User (Name,Email,Avatar,Surname) VALUES (?, ?, ?, ?)`, [name, email, picture, family_name], (err, result) => {
								if (err)
									throw err;
								let idUser = result.insertId; ///este sería el id del ultimo usuario creado 
								connection.query(`INSERT INTO UserGoogle (idUser,idGoogle) VALUES (?, ?)`, [idUser, id], (err, result) => {
									if (err)
										connection.query(`DELETE FROM User WHERE idUser = ? `, [idUser])
									const Payload = {
										"idUser": idUser,
										"User": name,
										"Email": email,
										 "Avatar":picture,
										"iat": new Date(),
										"role": "User",
										"ip": req.ip
									};
									res.cookie("jwt", JWT.generateJWT(Payload), options).redirect("http://localhost:3000/profile");
								});
							});
						} else {
							res.send("User name or Email already exists, please Login")
						}
					})
				connection.end();
				}
				
			}
		}
	} else {
		res.send({ "msg": "Error" });
	}
});
///////////////
const { google } = require("googleapis");
const { query } = require("express");
const { CLIENT_RENEG_WINDOW } = require("tls");
const { Server } = require("http");
const { siteVerification } = require("googleapis/build/src/apis/siteVerification");
const { type } = require("os");

let GOOGLE_CLIENT_SECRET = "SXcyjROrUcPU3AaUSPCrCFF2";
let GOOGLE_CLIENT_ID = "298704109696-uiv8f6d8j3bf84bevu7epha2o507dh5g.apps.googleusercontent.com";
const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	"http://localhost:8888/loginG"
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
	const { id, name, email } = userData;
	const Validated = EmailValidator(email);
	if(Validated){
		connection.query(`SELECT * FROM User WHERE Email ="${email}"`,(err,result)=> {
			if(err){
				throw error
			}
		})
	}


	console.log("facebook data: ", data);

});

/////////////////////////////////////////////////////////////////DATABASE MYSQL//////////////////////////////////////////////////////////////////////
//////////////////////CONNECT SQL/////////////////////////////////////

//let connection = openDB();

function openDB() {
	return mysql.createConnection({

		"host": process.env.HOST_SQL,
		"user": process.env.USER_SQL,
		"password": process.env.PASSWORD_SQL,
		"database": process.env.DATABASE_SQL
	})
}

function connect() {
	connection.connect(function (err) {
		if (err) {
			console.error(`error connecting: ${err.stack}`);
			return;
		}

		console.log(`connected as id ${connection.threadId}`);
	});
	return connection;
}

//////////////////EndPoints SQL//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////PLANTILLA QUERY/////////////////////////////////////////////

function SQLquery(string, options = {}) {
	return new Promise((resolve, reject) => {
		const connection = connect();
		connection.query(string, options, (err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});

	});
}
///REGISTER///
server.post("/register", (req, res) => {

	let newUser = req.body;
	console.log(newUser);

	if (newUser.Name && newUser.Email && newUser.Password && newUser.Surname) {
		let connection = openDB();
		let validated = CredentialsValidator(newUser.Email, newUser.Password);
		if (validated) {
			
			connection.query(`SELECT idUser FROM User WHERE Email = "${newUser.Email}";`, (err, result) => {
				console.log(result);
				if (err) {
					console.log(err);
					return;
				}

				if (!result.length) {//Si buscamos el email y da un array vacio =>registramos user

					connection.query(`INSERT INTO User (Name,Email,Avatar,Surname) VALUES ("${newUser.Name}","${newUser.Email}","${newUser.Avatar}","${newUser.Surname}");`, (err, result) => {
						if (err)
							throw err;
						// console.log(result)
						let idUser = result.insertId;
						connection.query(`INSERT INTO UserRegister (idUser, HashPass) VALUES (?, ?);`, [idUser, JWT.hash(newUser.Password)])

						const Payload = {
							"User": newUser.Name,
							"Email": newUser.Email,
							"iat": new Date(),
							"role": "User",
							"ip": req.ip
						};

						res.cookie("jwt", JWT.generateJWT(Payload), options).send("New user has been created.");
					
					})

				} else {
					res.send("User name or Email already exists")
					
				}
			})
		} else {
			res.send("Usuario o Contraseña NO válidos")
		}
	} else {
		res.send("Please, Complete Credentials");
		
	connection.end();
	}
	
})
///LOGIN///
server.post("/Login", (req, res) => {

	let userLogin = req.body;

	if (userLogin.Email && userLogin.HashPass) {

		let connection = openDB();

		connection.query(`SELECT idUser FROM User WHERE Email = "${userLogin.Email}";`, (err, result) => {
			if (err)
				throw err;
			if (result.length) {
				let idUser = result[0].idUser;
				connection.query(`SELECT * FROM UserRegister WHERE Hashpass = ? AND idUser=?`, [JWT.hash(userLogin.HashPass), idUser], (err, result) => {
					if (err)
						throw err;
					if (result.length)
					{
						const Payload = {
							"idUser": idUser,
							"Email": userLogin.Email,
							"iat": new Date(),
							"role": "User",
							"ip": req.ip
						};
						res.cookie("jwt", JWT.generateJWT(Payload), options).send("Logged¡");
					} else {
						res.send("Wrong credentials")
					}
				})
			}
			connection.end();
		});
	} else {
		res.send("Insert all credentials")
	}
});


///LOGOUT///

server.get("/logout", (req, res) => {
	if (JWT.verifyJWT(req.cookies.jwt))
	{
		const userData = JWT.getJWTInfo(req.cookies.jwt);
		if(userData){
			
		}
	}
	res.clearCookie("jwt", {path: "/"})
	.send({msg: "Cookie deleted"});
	// const cookies = require('cookie-universal')(req, res)
  	// cookies.remove('jwt')
 	// cookies.remove('jwt', {
    // // this will allow you to remove a cookie
    // // from a different path
    // path: 'http://localhost:3000'
//   })
})

///SEARCH PRODUCTS/// 

server.get("/searchProducts", (req, res) => {
	const { search, vegan, cruelty, eco } = req.query;
	let connection = openDB();
	connection.query(`SELECT * FROM Products WHERE (Name LIKE ? OR Brand LIKE ? OR Category LIKE ? ) ${vegan  === "true" ? "AND Vegan = 1" : ""} ${cruelty === "true" ? "AND Cruelty_free = 1" : ""} ${eco === "true" ? "AND Eco = 1" : ""}  LIMIT 10`, [`%${search}%`, `%${search}%`, `%${search}%`],(err,result)=>{
		if (err) {
			res.send(err);
		}
		
		
		if(result.length === 0){
			res.send({"error": "Producto No encontrado"})
		}
		else
		{
			const Product = result.map(product => {
				return {
					"Id":product.idProduct,
					"Name": product.Name,
					"Img": product.Picture,
					"Brand": product.Brand
				}
			});
			console.log(Product);
			res.send(Product)
		}
		
		
	})
	connection.end();
})
///SEARCH PRODUCT DETAILS///
server.get("/searchProducts/Details", (req, res) => {
	const {search} = req.query;
	let connection = openDB();
	connection.query(`SELECT * FROM Products WHERE idProduct = ?;`, [search],(err,result)=>{
		if (err) {
			res.send(err);
		}
		if(result){
			const Product = {
				"Id":product.idProduct,
				"Name": result[0].Name,
				"Img": result[0].Picture,
				"Brand": result[0].Brand,
				"Description": result[0].Description,
				"Ingredients": result[0].Ingredients
			}
			console.log(Product);
			res.send(Product);
		}
	})
	connection.end();				
})


/// BUSCADOR HERBOLARIOS ///

server.get("/searchRetailer", (req, res) => {
	let connection = openDB();
	connection.query("SELECT * FROM Retailer", (err, result) => {
		if (err) {
			res.send(err);
		} else {
			const Retailer = result.map(retailer => {
				return {
					"Name": retailer.Name,
					"Address": retailer.Address,
					"Phone": retailer.Phone,
					"Email": retailer.Email
				}
			});
			res.send(Retailer);
		}
	})
	connection.end();
});

///LISTA DE PRODUCTOS DEL HERBOLARIO SELECCIONADO ///

server.get("/searchRetailer/Products", (req, res) => {
	const { search } = req.query;
	let connection = openDB();
	connection.query(`SELECT p.Name, p.Brand, p.Picture FROM Retailer AS r JOIN Stock AS s ON r.idRetailer = s.id_Retailer JOIN Products AS p ON p.idProduct = s.id_Product WHERE r.idRetailer = ?`, [search],(err,result)=>{
		if (err) {
			res.send(err);
		}
		if (result) {
			const products = result.map(products => {
				return {
					"Name": products.Name,
					"Brand": products.Brand,
					"Picture": products.Picture
				}
			});

			res.send(products);
		}
	})
	connection.end();
})

////USER PROFILE///
server.get("/User", (req, res) => {
	if (JWT.verifyJWT(req.cookies.jwt))
	{
		const userData = JWT.getJWTInfo(req.cookies.jwt);
		
		if(userData)
		{
			let connection = openDB();
			connection.query(`SELECT * FROM User WHERE idUser = ?;`, [userData.idUser],(err,result)=>{
			if (err) {
			res.send(err);
			}
			if(result){
			console.log(result)
			res.send(result);
			}
			})
			connection.end();	
		}
		else
			res.send({"error": "No JWT from this User"});
	}
	else
		res.send({"error": "No JWT"});	
})

///EDIT USER PROFILE///	
server.put("/User/Edit/", (req, res) => {
	if(JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if (idUser) 
		{
			let connection = openDB();
			connection.query(`SELECT * FROM User WHERE idUser = ?;`, [idUser],(err, result) => {
				if (err) {
					res.send(err);
				}
				if (result) {
					console.log(result);
					const changes = req.body;
					const UserChange = {
						"idUser": idUser,
						"Name": changes.Name,
						"Surname": changes.Surname,
						"Email": changes.Email,
						"Avatar": changes.Avatar ? `"${changes.Avatar}"` : `NULL`
					}
					if (changes.Name && changes.Surname  && changes.Email) {
						let validated = CredentialsValidator(changes.Email, changes.Password);
						if (validated) {
							connection = openDB();
							connection.query(`UPDATE User SET  Name = "${changes.Name}",Email ="${changes.Email}",Avatar = ${UserChange.Avatar},Surname ="${changes.Surname}" WHERE idUser = ${idUser};`)

							const Payload = {
								"userName": changes.Name,
								"userEmail": changes.Email,
								"userAvatar": changes.Avatar,
								"userSurname": changes.Surname,
								"iat": new Date(),
								"role": "User",
								"ip": req.ip
							};
							res.cookie("jwt", generateJWT(Payload), options).send({ "msg": "User has been changed." });

						} else {
							res.send("User or password NOT valid");
						}
					} else {
						res.send("User name or Email don't exists");
					}
				} 
			})
			connection.end();
		}
		else
			res.send({"error": "No JWT from this User"});	
	}
	else
		res.send({"error": "No JWT"});
	
})
///////////////////////////////////////////////////////F A V S//////////////

///USER'S FAVS LIST //

server.get("/Favs", (req, res) => {
	if(JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if(idUser)
		{
			let connection = openDB();
			connection.query(`SELECT p.Name, p.Brand, p.Category, p.Picture FROM Products AS p JOIN Favs as f ON p.idProduct = f.idProduct WHERE f.idUser = ?`, [idUser],(err,result)=>{
			if (err) {
				res.send(err);
			}
			if(result){
				res.send(result);
			}
			})
			connection.end();
		}
		else
			res.send({"error": "No JWT from this User"});	
	}
	else
		res.send({"error": "No JWT"});
	
})
///ADD FAV///

server.put("/AddFav", (req, res) =>{
	if (JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if (idUser)
		{
			const {idProduct} = req.query;
				if(idProduct,idUser){
					let connection = openDB();
					connection.query(`INSERT INTO Favs (idUser, idProduct) VALUES (?,?)`,[idUser,idProduct], (err,result)=>{
						if(err){
							res.send(err);
						}
						if(result){
							res.send({msg:0,tst:"Inserted Fav"});
						}
					})
				connection.end();	
			}
		}
		else
			res.send({"error": "No JWT from this User"});
	}
	else
		res.send({"error": "No JWT"});
})
///Delete FAV ////

server.get("/DeleteFav", (req, res) => {
	const { idfav } = req.query;
	let connection = openDB();
	connection.query(`DELETE FROM Favs WHERE idFavs=?`, [idfav],(err,result)=>{
		if (err) {
			res.send(err);
		}
		if(result){
			res.send("Fav Deleted")
		}
	})
	connection.end();
})

///SHOW USER'S FOLDERS FAVS names///

server.get("/ShowUserFolders", (req, res) => {
	if(JWT.verifyJWT(req.cookies.jwt))
	{
		const { idUser } = JWT.getJWTInfo(req.cookies.jwt)
		if(idUser)
		{
			let connection = openDB();
			connection.query(`SELECT f.Name_Folder FROM Folder AS f JOIN UserFolder AS uf ON f.idFolder = uf.idFolder WHERE uf.idUser =?`, [idUser],(err,result)=>{
				if (err) {
					res.send(err);
				}
				if (result){
					res.send(result.map(folder => folder.Name_Folder));
				}
			})
		connection.end();
		}
		else
			res.send({"error": "No JWT from this User"});
	}
	else
		res.send({"error": "No JWT"});
})

///USER'S FOLDER CONTENT///

server.get("/ShowFolderContent", (req, res) => {
	const { folder } = req.query;
	let connection = openDB();
	connection.query(`SELECT p.Name, p.Brand, p.Picture FROM Products AS p JOIN Favs AS f ON p.idProduct = f.idProduct JOIN FolderFavs AS ff ON ff.idFavs=f.idFavs WHERE idFolder=?`, [folder],(err,result)=>{
		if (err) {
			res.send(err);
		}
		if (result){
			res.send(result);
		}
	})
	connection.end();
})

///DELETE USER´S FOLDER///

server.get("/DeleteFolder", (req, res) => {
	if(JWT.verifyJWT(req.cookies.jwt)){
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt)
		if(idUser)
		{
		const { folder} = req.query
		let connection = openDB();
		connection.query(`DELETE FROM UserFolder WHERE idFolder=? AND idUser=?`, [folder,idUser],(err,result)=>{
			if (err) {
				res.send(err);
			}
			if(result.affectedRows===0){
				res.send("Folder NOT exist");
			}else{
				res.send("Folder Deleted");
			}
		})
		connection.end();
		}
		else
			res.send({"error": "No JWT from this User"})
	}
	res.send({"error": "No JWT"})
})
///CREATE FOLDER dentro de USER///

server.put("/CreateFolder", (req , res) =>{
	
	if (JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if (idUser)
		{
			//Primero Creamos Carpeta en la tabla Folder//
			const{FolderName} = req.body;
				if(FolderName){
					console.log(idUser)
					let connection = openDB();
					connection.query(`SELECT * FROM Folder WHERE name_folder = ?`,[FolderName],(err, result)=>{
						
						if(err){
							res.send(err);
						}
						if(!result.length){//Si nos da un array vacio es que no tenemos ese nombre en la base de datos
							let connection = openDB();
							connection.query(`INSERT INTO Folder (name_Folder) VALUES (?)`,[FolderName],(err,result)=>{
								if(err){
									res.send(err);
								}
								if(result){
									let idFolder = result.insertId;//Id del Ultimo folder creado
									//Asociamos la nueva carpeta al Usuario (la metemos en la tabla UserFolder)
									let connection = openDB();
									connection.query(`INSERT INTO UserFolder (idUser,idFolder) VALUES(?,?)`,[idUser,idFolder],(err,result)=>{
										if(err){
											res.send(err);
										}
										if(result){
											res.send({"res":"0","msg":"Folder Created"})
										}
									})
								}
								else
									res.send({"res":"1","msg":"Please,Insert your Folder Name"})
							})
						}
						else{
							//Aun así tenemos que añadirla usando el mismo idFolder de la que ya existe en nuestra DB
							let idFolder2 = result[0].idFolder;
							let connection = openDB();
							connection.query(`SELECT * FROM UserFolder WHERE idFolder =? AND idUser=?`,[idFolder2,idUser],(err,result)=>{
								
								if(err){
									res.send(err);
								}
								if(!result.length){ //Si NO tenemos dicha carpeta entonces si que la añadimos a UserFolder
									connection.query(`INSERT INTO UserFolder (idUser,idFolder) VALUES(?,?)`,[idUser,idFolder2], (err,result)=>{
									if(err){
									throw err;
									}
									if(result){
									res.send({"res":"2","msg":"added to FolderFavs with a reference to an existing folder in Folder table"});
									}
									})
								}
								else
									res.send({"res":"3","msg":"Folder Already exits"});
							})
							
						}
					});
					connection.end();
				}
		}
	}
});
//EDIT name USER'S FOLDER //

server.put("/EditFolder",(req, res)=>{
	if (JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if (idUser) 
		{
			let connection = openDB();
			connection.query(`SELECT f.name_Folder, f.idFolder FROM Folder AS f JOIN UserFolder AS uf ON uf.idFolder= f.idFolder WHERE idUser=?`, [idUser],(err,result)=>{
				if(err){
					res.send(err);
				}
				if(result){
					const {idFolder}=req.query;
					const {newName}=req.body;
					let connection =openDB();
					connection.query(`UPDATE Folder SET name_Folder =? WHERE idFolder=?`,[newName,idFolder],(err,result)=>{
						if(err){
							res.send(err);
						}
						if (result){
							res.send({"msg":"Name Updated"})
						}
					})
				}
			})
		}
		else
			res.send({"error": "No JWT from this User"})
	}
	else
		res.send({"error": "No JWT"});
})

//ADD FAV TO USER'S FOLDER//

server.put("/AddFavToFolder",(req, res) =>{
	if(JWT.verifyJWT(req.cookies.jwt))
	{
		const {idUser} = JWT.getJWTInfo(req.cookies.jwt);
		if (idUser)
		{
			//PRIMERO añadimos a Favs
			{
				const {idProduct} = req.query;
				if(idProduct,idUser){
						let connection = openDB();
						connection.query(`INSERT INTO Favs (idUser, idProduct) VALUES (?,?)`,[idUser,idProduct], (err,result)=>{
							if(err){
								res.send(err);
							}
							if(result){//SEGUNDO añadimos a FolderFavs
								let idFav = result.insertId;//Último fav añadido
								const {idFolder} = req.query;
								let connection = openDB();
								connection.query(`INSERT INTO FolderFavs (idFolder,idFavs) VALUES (?,?)`,[idFolder, idFav], (err, result)=>{
									if(err){
										res.send(err);
									}
									if(result){
										res.send({msg:0,tst:"Inserted Fav to Folder"});
									}
								});
							}
						});
					connection.end();	
				}
				else
					res.send({"res":"Not iDProduct"})
			}
		}
		else
			res.send({"error": "No JWT from this User"});
	}
	else
		res.send({"error": "No JWT"});
});

///DELETE FAV FROM USER'S CONTENT///

server.get("/DeleteFolderContent", (req, res) => {
	const { idfav } = req.query

	let connection = openDB();
	connection.query(`DELETE FROM FolderFavs WHERE idFavs=?`, [idfav], (err,result)=>{
		if (err) {
			res.send(err);
		}
		if (result.affectedRows===0){
			res.send("This Fav NOT exit");
		}else{
			res.send("Fav Deleted from Folder");
		}		
	})
	connection.end();
});

//// UPLOAD PROFILE IMAGE TO FB AND DB ////
server.post("/upload", Multer().none() , async (req, res) => {
	const {img} = req.body;
	if (img)
	{
		let url = await FirebaseUpload(img);
		console.log("URL", url);
		res.send({url});
		if (JWT.verifyJWT(req.cookies.jwt))
		{
			const {idUser} = JWT.getJWTInfo(req.cookies.jwt)
			if (idUser)
			
			{
				let connection = openDB();
				connection.query(`UPDATE User SET Avatar = ? WHERE idUser = ? `, [url, idUser], (err, result) => {
				if (err) {
					res.send(err)
				} 
				if(result){
					res.send({"msg": "Uploaded profile image"})
				}
			})
	
			connection.end()
		
			};
		};
	}
	else
		res.send({"error": "No image provided"})
	// res.send({"url": await FirebaseUpload(img)});
});

//////////////////////////////////////////////
////////LISTENING PORT/////////

server.listen(listeningPort, () => {
	console.log(`Server Listening on port ${listeningPort}`);
})


