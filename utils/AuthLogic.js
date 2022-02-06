const AuthLogic = {};

AuthLogic.spotifyAuth = async (req, res, next) => {

  console.log('req', req.user)
  //Genarate token for your APP 

  //Db Operations for incoming User or Business Logic 

  //redirect to your redirect url with auth token


  next();
};

module.exports = AuthLogic;
