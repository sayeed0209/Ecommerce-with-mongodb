const express = require('express');
const { Error } = require('mongoose');
const Product = require('../models/products');
const { validateSchema } = require('../utils/validationSchema');
const validator = require('express-joi-validation').createValidator({});
const router = express.Router();
const validateProduct = async (req, res, next) => {
	try {
		const { error } = validateSchema.validate(req.body);
		if (error) {
			const msg = error.details.map(err => err.message).join(',');
			// throw new Error(msg, 400);
			req.flash('error', msg);
			console.log(msg);
		} else {
			next();
		}
	} catch (err) {
		console.log(err.message);
		console.log(err);
	}
};
router.get('/', (req, res) => {
	res.render('products/index');
});
router.post('/', validateProduct, async (req, res) => {
	try {
		const product = new Product(req.body);
		res.send(product);
	} catch (e) {
		req.flash('error', e);
		console.log(e.message);
	}
});
router.get('/new', (req, res) => {
	res.render('products/newproduct');
});

module.exports = router;
