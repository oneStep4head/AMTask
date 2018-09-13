var Users = require('../models/users');
var crypto = require('crypto');


var passCryptor = exports.passCryptor = function (pass) {
	var hash;
	hash = crypto.createHmac('sha1', 'I need more beers').update(pass).digest('hex');
	return hash;
}

// exports.hashMaker = function(pass) {
// 	return passCryptor(pass);
// }

exports.findAll = function(req, res, callback) {
	Users.findAll(function(err, docs) {
		if (callback && typeof(callback) === 'function') {
			console.log('findAll userController cb');
			callback(err, docs);
		} else {
			if (err) {
			console.log(err);
			return res.sendStatus(500);
			}
			res.send(docs);
		}
	})
}

exports.findByID = function(req, res, callback) {
	Users.findByID(req.params.userID, (err, doc) => {
		if (callback && typeof(callback) === ' function') {
			callback(err, doc);
		} else {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(doc);
		}
	})
}

exports.findByName = function(req, res, callback) {
	Users.findByName(req.params.name, (err, doc) => {
		if (callback && typeof(callback) === ' function') {
			callback(err, doc);
		} else {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(doc);
		}
	})
}

// exports.checkUser = function (username, callback) {
// 	User.findByName(username, (err, doc) => {
// 		if (err) {
// 			console.log(err);
// 			return null
// 		}
// 		return user;
// 	})
// }

exports.regUser = function(req, res) {
	console.log(`starts to register ${req.body.name} : ${req.body.passwd}`);
	// var passHashed = passCryptor(req.body.password);
	// console.log(`Hashed password ${passHashed}`);
	
	var user = {
		name: req.body.name,
		passwd: passCryptor(req.body.passwd)
	}
	console.log(`prepare User obj name: ${user.name}, pass: ${user.passwd}`);
	
	Users.findByName(user.name, (err, doc) => {
		console.log(doc);
		if(err) { 
			console.log('Error while finding user with the same login' + err);
			return new Error('Error while finding user with the same login' + err);
		}
		if(!user.name) {
			console.log('name does not sent or corrupt');
			return new Error('name does not sent or corrupt');
		}
		if(doc !== null) {
			// console.log(`No`);
			// // res.redirect('/register');
			// return new Error(`${user.name} already exist, pls take another login`);
			if(doc.name === user.name) {
				console.log(`${user.name} already exist, pls take another login`);
				// res.redirect('/register');
				return res.render('error', new Error(`${user.name} already exist, pls take another login`));
			}
		}
		Users.regUser(user, (err, newUser) => {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		})
		req.logIn(user, (err)=>{
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.status(200);
			res.redirect('/');
		});
	})
}

exports.editUser = function(req, res)  {
	var newData = {
		$set: {
			name: req.body.name,
			passwd: passCryptor(req.body.passwd),
		}
	}
	Users.editUser(req.params.userID, newData, (err, result) => {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
}

exports.deleteUser = function(req, res) {
	Users.deleteUser(req.params.userID, (err, result) => {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
}

