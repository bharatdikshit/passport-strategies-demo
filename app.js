const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
var jwt = require("jsonwebtoken");
var cors = require('cors')
const socialLoginRoutes = require('./routes/SocialLoginRoutes')

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }))

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(socialLoginRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});
app.listen(8888);
	