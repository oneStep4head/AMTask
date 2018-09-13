var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

/* GET home page. */

// router.get('/', authControll.ensureAuth, function(req, res, next) {
//   res.render('index');
// });

router.get('/', authController.ensureNotAuth, (req, res) => { res.render('register') })
router.post('/', (req, res) => {
	userController.regUser(req, res);
});

module.exports = router;
