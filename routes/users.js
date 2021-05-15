const express = require('express');
const passport = require('passport')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const user = require('../controllers/user')

router.route('/register')
    .get(user.signUp)
    .post(catchAsync(user.createUser));

router.route('/login')
    .get(user.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.validLogin);

router.get('/logout', user.logout)

module.exports = router;