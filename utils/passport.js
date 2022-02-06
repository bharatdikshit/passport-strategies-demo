const passport = require("passport");
require('dotenv').config()
const SpotifyStrategy = require('passport-spotify').Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
var TwitterStrategy = require("passport-twitter-oauth2").Strategy;
var RedditStrategy = require("passport-reddit").Strategy;
var axios = require('axios')

//Spotify

passport.use(
	new SpotifyStrategy(
		{
			clientID: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			callbackURL: process.env.SPOTIFY_CALL_BACK_URL,
		},
		(accessToken, refreshToken, expires_in, profile, done) => {
			console.log("passport fired", accessToken);
			console.log("done");

			axios
				.get(
					'https://api.spotify.com/v1/artists/6LEG9Ld1aLImEFEVHdWNSB/albums', {
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer ' + accessToken,
						'Content-Type': 'application/json',
					},
				}).then((data) => {
					var songs_name = data.data.items.map(_ => _.name)
					console.log('data.', songs_name)
				}
				)
				.catch((err) => console.log(err));
				
			done(null, profile);

		}
	)
);

//Google

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALL_BACK_URL,
		},
		(accessToken, refreshToken, expires_in, profile, done) => {
			console.log("passport fired", accessToken);
			console.log("done");				
			done(null, profile);

		}
	)
);

//Linkedin

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
		},
		(accessToken, refreshToken, expires_in, profile, done) => {
			console.log("passport fired", accessToken);
			console.log("done");				
			done(null, profile);

		}
	)
);

passport.use(
	new RedditStrategy(
		{
			clientID: process.env.REDDIT_CONSUMER_KEY,
			clientSecret: process.env.REDDIT_CONSUMER_SECRET,
			callbackURL: process.env.REDDIT_CALL_BACK_URL,
			
		},
		function (accessToken, refreshToken, profile, done) {
			// asynchronous verification, for effect...
			console.log("passport fired",accessToken);
			console.log("done");
			done(null, profile);
		}
	)
);




