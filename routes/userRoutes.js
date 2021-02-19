const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();
const { catchAsync } = require('../utils/catchAsync');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const newuser = await new User({ username, email });
		const registerUser = await User.register(newuser, password);
		console.log(registerUser);
        res.redirect()
	} catch (err) {
		console.log(err.message);
	}
});
module.exports = router;
