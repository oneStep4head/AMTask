var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

/* GET home page. */

// router.get('/', authController.ensureAuth, function(req, res, next) {
//   res.render('index');
// });

router.get('/', authController.ensureNotAuth, (req, res)=>{ res.render('login') })
router.post('/', (req, res) => {
	authController.login(req, res);
});

module.exports = router;
