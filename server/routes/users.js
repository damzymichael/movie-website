const express = require('express')
const {createUser, signUserIn} = require('../controllers/user')
const router = express.Router()

//login route
router.post("/login", signUserIn);

//signup route
router.post("/signup", createUser); 

module.exports = router;