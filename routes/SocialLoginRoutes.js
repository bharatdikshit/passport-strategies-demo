const express = require('express');
const socialLoginRoutes = express.Router();
const authLogic = require("../utils/AuthLogic");
const passport = require("passport");
require("../utils/passport");
var crypto = require('crypto')

passport.serializeUser(function(user, done) {
	done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// Spotify 

socialLoginRoutes.get(
	"/spotify",
	passport.authenticate("spotify", {
		scope: ['user-read-email', 'user-read-private'],
		session: false,
	}) 
);

socialLoginRoutes.get(
	"/spotify/redirect",
	passport.authenticate("spotify", { session: false }),
	authLogic.spotifyAuth,
	(req, res) => {
		console.log('hi')
		res.send("you reached the callback URI");
	}
);

// Google 

socialLoginRoutes.get(
	"/google",
	passport.authenticate("google", {
		scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
		session: false,
	}) 
);

socialLoginRoutes.get(
	"/google/redirect",
	passport.authenticate("google", { session: false }),
	authLogic.spotifyAuth,
	(req, res) => {
		console.log('hi')
		res.send("you reached the callback URI");
	}
);

// Linkedin

socialLoginRoutes.get(
	"/linkedin",
	passport.authenticate("linkedin", {
		scope: ["r_liteprofile", "r_emailaddress"],
		session: false,
	}) 
);

socialLoginRoutes.get(
	"/linkedin/redirect",
	passport.authenticate("linkedin", { session: false }),
	authLogic.spotifyAuth,
	(req, res) => {
		console.log('hi')
		res.send("you reached the callback URI");
	}
);

// Reddit

socialLoginRoutes.get(
	"/reddit",(req,res,next)=>{
	req.session.state = crypto.randomBytes(32).toString('hex');
	passport.authenticate('reddit', {
	state: req.session.state,
	})(req,res,next)
	})
	
	socialLoginRoutes.get(
	"/reddit/redirect",
	passport.authenticate('reddit',{ failureRedirect: '/login' }),
	authLogic.spotifyAuth,
	(req, res) => {
	console.log('hi')
	res.send("you reached the callback URI");
	}
	);
  

module.exports = socialLoginRoutes;
