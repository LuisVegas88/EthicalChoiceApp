const crypto = require("crypto");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const CLIENT_ID = process.env.ID_FACEBOOK;
const CLIENT_SECRET = process.env.SECRET_FACEBOOK;
const REDIRECT_URI = "http://localhost:8888/loginFB";
const SCOPES = ["email"];

class facebook {
    constructor() {
        this.states = [];
        this.adminToken = {};
        this.setAdminToken();
    }
    setAdminToken() {
        fetch(`https://graph.facebook.com/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`)
            .then(res => res.json())
            .then(data => this.adminToken = { type: data.token_type, token: data.access_token });
    }
    getRedirectUrl() {
        const state = crypto.randomBytes(16).toString("hex");
        this.states.push(state);
        return (`https://www.facebook.com/v9.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${SCOPES.join(",")}`);
    }

    getOauthToken(code, state) {
        return new Promise((resolve) => {
            const statePosition = this.states.findIndex(State => State === state);
            //If the state we sent is equal to the current state
            if (statePosition > -1 && code.length) {
                this.states.splice(statePosition, 1);
                fetch(`https://graph.facebook.com/v9.0/oauth/access_token?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}&code=${code}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error)
                            resolve(data);
                        else
                            resolve({ type: data.token_type, token: data.access_token });
                    })
            }
            else
                resolve(false);
        });
    }

    getUserId(token) {
        return new Promise((resolve) => {
            if (token.token && token.type && this.adminToken.token) {
                fetch(`https://graph.facebook.com/debug_token?input_token=${token.token}&access_token=${this.adminToken.token}`)
                    .then(res => res.json())
                    .then(data => resolve(data.data));
            }
            else
                resolve(false);
        })
    }

    async getUserInfo(token, fields) {
        const Id = (await this.getUserId(token)).user_id;
        console.log("ID:", Id);
        const response = await fetch(`https://graph.facebook.com/v9.0/${Id}?fields=${fields.join(",")}&access_token=${token.token}`);
        const data = await response.json();
        return data;
    }
}


module.exports = facebook;