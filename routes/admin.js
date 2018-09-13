var express = require('express');
var router = express.Router();
var authControll = require('../controllers/authController');
var taskController = require('../controllers/taskController');
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', 
	authControll.ensureAuth, 
	function(req, res, next) {
		userController.findAll(req, res, (err, users) => { 
			if(err) {
				console.log(err);
				next(err);
			}
			console.log(`found users in db: ${users}`);
			taskController.findAll(req, res, (err, tasks) => {
				if(err) {
					console.log(err);
					next(err);
				}
				console.log(`found tasks in db: ${tasks}`);
				res.render('admin.pug', {
					username: req.user.name,
					users: users,
					tasks: tasks
				});
			})
		});
});

module.exports = router;
