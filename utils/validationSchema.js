const { required } = require('joi');
const Joi = require('joi');
module.exports.validateSchema = Joi.object({
	title: Joi.string().required(),
	image: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number().required(),
});


