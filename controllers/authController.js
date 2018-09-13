var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');
var userController = require('./userController');

exports.ensureAuth = function(req, res, next) {
	if (req.isAuthenticated()) {
			return next();
	}
	res.redirect('/login');
}

exports.ensureNotAuth = function(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	} else {
		return next();
	}
}

function passCompare (passwd, dbPassHash, callback) {
	console.log(`starts to compare passwds: ${passwd}, ${dbPassHash}`);
	if(userController.passCryptor(passwd) === dbPassHash) {
		console.log(`pass comparing returns true: ${userController.passCryptor(passwd)} and ${dbPassHash}`);
		callback(null, true);
	} else {
		var err = 'pass does not correct';
		callback(err, false);
	}
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.login = function(req,res,next) {
	passport.authenticate('local', function (err, user, info) {
		console.log(`passport.authenticate: ${user.name}`);
		if(err) { return next(err); } 
		if(!user) {return res.redirect('/register'); }
		req.logIn(user, (err) => {
			console.log(`starts req.logIn with ${user.name}`);
			if(err) { return next(err); }
			console.log('success, rediret to root');
			return res.redirect('/');
		});
	})(req, res, next);
}

passport.serializeUser( function(user, done) {
	console.log(`serializeUser :  ${user.name} and ${user._id}`);
	console.log(`serializeUser :  ${user}`);
	done(null, user._id)
})

passport.deserializeUser( function(_id, done) {
	User.findByID( _id, (err, user) => {
		if(err) {
			done(err);
		}
		console.log('DesserializeUser');
		console.log('User foundByID: ' + user._id);
		console.log('User name: ' + user.name);
		done(null, user);
	});
})

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'passwd'
	}, (name, passwd, done) => {
		console.log(`Args on LocalStrategy: ${name}: ${passwd}`);
		
		User.findByName(name, (err, user) => {
			if (err) {
				return done(err)
			} else {
				if(user) {
					console.log(`befor pass comparing the user is: ${user.name}`);
					console.log(`input username: ${name}`);
					passCompare(passwd, user.passwd, (err, isValid) => {
						if (err) {
							return done(err)
						}
						if (!isValid) {
							console.log(`pass is not valid: ${passwd}`);
							return done(null, false)
						}
						console.log(`pass is valid: ${passwd}`);
						console.log(`and the user is: ${user.name} and ${user.passwd}`);
						return done(null, user)
					});
				}
			}
		});
	}
))