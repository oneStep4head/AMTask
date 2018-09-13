var ObjectID = require('mongodb').ObjectID;
var db = require('../libs/db');

exports.findAll = function (callback) {
	db.get().collection('tasks').find().toArray((err, docs) => {
		callback(err, docs);
	})
}

exports.findByOwner = function (taskOwner, callback) {
	db.get().collection('tasks').find({owner: taskOwner}).toArray((err,docs) => {
		console.log(`in DB cb ${docs}`);
		callback(err, docs);
	})
}

exports.findByID = function (id, callback) {
	console.log('in DB try to find a task by id: ' + id);
	
	db.get().collection('tasks').findOne({ _id: ObjectID(id)}, (err,doc) => {
		console.log('in DB cb: ' + doc);
		callback(err, doc);
	})
}

exports.createTask = function (task, callback) {
	db.get().collection('tasks').insert(task, (err, result) => {
		callback(err, result);
	})
}


exports.editTask = function(id, newData, callback) {
	
	console.log('id: ' + id);
	console.log('newData: ' + newData);
	
	db.get().collection('tasks').updateOne(
		{ _id: ObjectID(id)},
		newData,
		(err, result) => {
			callback(err, result);
		}
	)
}

exports.deleteTask = function (id, callback) {
	db.get().collection('tasks').deleteOne( {_id: ObjectID(id) }, (err, result) => {
		callback(err, callback);
	})
}
