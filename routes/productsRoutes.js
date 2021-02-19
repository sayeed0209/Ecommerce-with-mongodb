const express = require('express');
const { Error } = require('mongoose');
const { findById } = require('../models/products');
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
router.get('/', async (req, res) => {
	const products = await Product.find({});
	res.render('products/index', { products });
});
router.post('/', validateProduct, async (req, res) => {
	try {
		const { title, description, image, price } = req.body;
		const product = new Product({ title, description, image, price });
		await product.save();
		res.redirect('/products');
	} catch (e) {
		req.flash('error', e);
		console.log(e.message);
	}
});
router.get('/new', (req, res) => {
	res.render('products/newproduct');
});
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('products/show', { product });
});
router.get('/:id/edit', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('products/update', { product });
});
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, description, image, price } = req.body;
	const product = await Product.findByIdAndUpdate(
		id,
		{ title, description, image, price },
		{ runValidators: true }
	);
	req.flash('success', 'Successfully updated');
	res.redirect(`/products/${id}`);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id);
	req.flash('success', 'Deleted Succussfully');
	res.redirect('/products');
});
module.exports = router;
