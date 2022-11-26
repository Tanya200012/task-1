const { Router } = require("express");
const express = require("express");
const router = express.Router();
const authPerson = require("../controller/authPerson")

router.post('/signup',authPerson.addUser) 
router.post('/login',authPerson.loginStudent) 


module.exports = router;