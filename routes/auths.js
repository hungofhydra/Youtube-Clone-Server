const express = require('express');

const { } = require('../controllers/auth');
const router = express.Router();
const {signUp,signIn, googleAuth, logout} = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleAuth);
router.get('/logout', logout);

module.exports = router;    