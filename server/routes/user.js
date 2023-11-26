const express = require("express")
const router = express.Router();
const {
    handleUserSignup,
    handleUserLogin,
    getUserData
} = require('../controllers/user')

router.post('/register', handleUserSignup);
router.post('/login', handleUserLogin);
router.get('/profile', getUserData); 

module.exports = router;