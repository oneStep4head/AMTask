var express = require('express');
var router = express.Router();
var authControll = require('../controllers/authController');
var taskController = require('../controllers/taskController');

/* GET users listing. */
router.get('/:taskID', 
	authControll.ensureAuth, 
	function(req, res, next) {
		taskController.findByID(req, res, (err, doc) => { 
			if(err) {
				console.log(err);
				next(err);
			}
			console.log(`in findByID cb: ${doc}`);
			res.render('edit.pug', {
				username: req.user.name,
				task: doc
			});
		});
});

module.exports = router;
