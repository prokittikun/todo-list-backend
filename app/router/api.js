let express = require('express');
let router = express.Router();
let api = require("../controller/api.controller.js");


router.post('/addData', api.addWork);
router.post('/getPaginationWorkList', api.getPagination);
router.post('/deleteWorkById', api.deleteWorkById);
router.post('/login', api.login);
router.post('/register', api.register);


module.exports = router;