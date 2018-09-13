var ObjectID = require('mongodb').ObjectID;
var db = require('../libs/db');

exports.findAll = function (callback) {
	db.get().collection('users').find().toArray((err, docs) => {
		callback(err, docs);
	})
}

exports.findByID = function (id, callback) {
	db.get().collection('users').findOne({ _id: ObjectID(id)}, (err,doc) => {
		callback(err, doc);
	})
}

exports.findByName = function (name, callback) {
	db.get().collection('users').findOne({ name: name }, (err,doc) => {
		callback(err, doc);
	})
}

exports.regUser = function (user, callback) {
	db.get().collection('users').insert(user, (err, doc) => {
		callback(err, doc);
	})
}


exports.editUser = function(id, newData, callback) {
	db.get().collection('users').updateOne(
		{ _id: ObjectID(id)},
		newData,
		(err, result) => {
			callback(err, result);
		}
	)
}

exports.deleteUser = function (id, callback) {
	db.get().collection('users').deleteOne( {_id: ObjectID(id) }, (err, result) => {
		callback(err, callback);
	})
}
