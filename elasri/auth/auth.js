

const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
var express = require('express');
var routerAuth = express.Router();

const { getUserByEmail } = require('../repositories/users')
const secretKey = "thisIsMySectetKeyforJsonWebToken@@0000"

const authCheck = (req, res, next) => {
	jwt({
		secret: secretKey, algorithms: ['HS256'], credentialsRequired: false,
		getToken: (req) => {
		    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		        return req.headers.authorization.split(' ')[1];
		    } else if (req.query && req.query.token) {
		      return req.query.token;
		    } else if (req.cookies && req.cookies.token){
		    	return req.cookies.token
		    }
		    return null;
		  }
	})(req, res, function(err){
		if (err) { 
			if (err.name == "UnauthorizedError") return res.status(401).json({error: "Invalid Token"})
			return res.status(500).json({error: "500 Internal Server Error"})
		}
	    if (!req.user) return res.status(401).json({error: "You must be logged In to access this page."});
	    if(req.user.role == "guest") return res.status(401).json({error: "You are Unauthorized to access this page."});
	    next();
	});


}

const createToken = (user) => {
	const token = jsonwebtoken.sign({ id:user.id, email:user.email, role:user.role }, secretKey, { expiresIn: '1d' });
	return token;
}

routerAuth.post('/login', async (req, res) =>{
    const { email, password} = req.body
    const user = await getUserByEmail(email)
    if (user){
        if (password == user.password){
            const token = createToken(user)
            res.json({token})
        }
    }
    res.json({error:"Email Or Password is Incorrect"})
})

module.exports = { authCheck, routerAuth };
