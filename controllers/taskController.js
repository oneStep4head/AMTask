var Tasks = require('../models/tasks');
//if u see method with '_' before its name, it's becouse this method send to client nothing, works only inside of app
exports.findAll = function(req, res, callback) {
	Tasks.findAll(function(err, docs) {
		if (callback && typeof(callback) === 'function'){
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

exports._findByOwner = function(req, res, callback) {
	Tasks.findByOwner(req.user.name, (err, docs) => {
		callback(err, docs);
		// if (err) {
		// 	console.log(err);
		// 	return err;
		// }

		// console.log(`in DB controller cb:\n${docs}`);
		// return docs;
	})
}

exports.findByOwner = function(req, res, callback) {
	Tasks.findByOwner(req.user.name, (err, docs) => {
		if (callback && typeof(callback) === 'function') {
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
	Tasks.findByID(req.params.taskID, (err, doc) => {
		if (callback && typeof(callback) === 'function') {
			callback(err, doc)
		} else {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(doc);
		}
	})
}

exports.createTask = function(req, res) {
	var task = {
		owner: req.user.name,
		name: req.body.name,
		status: req.body.status,
		priority: req.body.priority
	}
	Tasks.createTask(task, (err, result) => {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.status(200).redirect('back');
	})
}

exports.editTask = function(req, res)  {
	var newData = {
		$set: {
			name: req.body.name,
			status: req.body.status,
			priority: req.body.priority
		}
	}
	console.log('taskID: ' + req.params.taskID);
	console.log('newData: ' + newData);
	console.log('req.body.name: ' + req.body.name);
	console.log('req.body.status: ' + req.body.name);
	console.log('req.body.priority: ' + req.body.name);
	
	Tasks.editTask(req.params.taskID, newData, (err, result) => {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
}

exports.deleteTask = function(req, res) {
	Tasks.deleteTask(req.params.taskID, (err, result) => {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
}