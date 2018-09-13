var MongoClient = require('mongodb').MongoClient;

// // err ? reject(err) : resolve ();
// function checkMongoDBState() {
// 	return new Promise ((resolve, reject) => {
// 		MongoClient.connect(config.db.mongo, (err, database) => {
// 			if (err){
// 				console.log('DB is not Working');
// 				reject(err);
// 			}
// 			resolve(database);
// 		});
// 	});
// }

// module.exports = checkMongoDBState;

var state = {
	db: null
}
const dbName = 'todo';

exports.connect = (url, done) => {
	if (state.db) {
		return done();
	}

	MongoClient.connect(url, function (err, client) {
		if (err) {
			console.log('DB is not working');
			return done(err);
		} else {
		console.log('DB is connected');
		
		state.db = client.db('todo');
		done();
		}
	}) 
}

exports.get = function() {
	return state.db;
}