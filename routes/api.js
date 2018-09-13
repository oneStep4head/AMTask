var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var taskController = require('../controllers/taskController');
/* GET home page. */

// router.get('/', authControll.ensureAuth, function(req, res, next) {
//   res.render('index');
// });
//TASKS API
router.get('/tasks/', taskController.findAll);
router.get('/tasks/:taskID', taskController.findByID);
router.post('/tasks/', taskController.createTask);
router.put('/tasks/:taskID', taskController.editTask);
router.delete('/tasks/:taskID',	taskController.deleteTask);

router.get('/users/', userController.findAll);
router.get('/users/:userID', userController.findByID);
router.post('/users/', userController.regUser);
router.put('/users/:userID', userController.editUser);
router.delete('/users/:userID', userController.deleteUser);


module.exports = router;
