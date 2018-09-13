var express = require('express');
var router = express.Router();
var pug = require('pug');
var authControll = require('../controllers/authController');
var taskController = require('../controllers/taskController');
var tasks = require('../models/tasks');
/* GET home page. */
console.log('Index Router Starts');

router.get('/', authControll.ensureAuth, 
	function(req, res, next) {
		taskController.findByOwner(req, res, (err, docs) => { 
			if(err) {
				console.log(err);
				next(err);
			}
			console.log(`in _findByOwner cb: ${tasks}`);
			res.render('index.pug', {
				username: req.user.name,
				tasks: docs
			});
		});
});

module.exports = router;
