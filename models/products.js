const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
	title: {
		type: String,
		min: 5,
		required: [true, 'A prodcuts must have a title'],
	},
	description: {
		type: String,
		min: 15,
		max: 255,
	},
	image: {
		type: String,
		required: [true, 'A product must have an image'],
	},
	price: {
		type: Number,
		default: 1,
		required: true,
	},
});

module.exports = mongoose.model('Product', ProductsSchema);
