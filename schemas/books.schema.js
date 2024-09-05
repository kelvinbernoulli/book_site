const Joi = require("joi");

const bookCreateSchema = Joi.object({
  title: Joi.string().max(255).required(),
  author: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  published_date: Joi.date().optional().allow(null),
  isbn: Joi.string().length(13).required(),
  category: Joi.string().max(255).required(),
  stock_quantity: Joi.number().integer().min(0).default(0),
  cover_image: Joi.string().max(255).optional().allow(""),
});

const bookUpdateSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  author: Joi.string().max(255).optional(),
  description: Joi.string().optional().allow(""),
  price: Joi.number().precision(2).positive().optional(),
  published_date: Joi.date().optional().allow(null),
  isbn: Joi.string().length(13).optional().allow(""),
  category: Joi.string().max(255).optional().allow(""),
  stock_quantity: Joi.number().integer().min(0).default(0).optional(),
  cover_image: Joi.string().max(255).optional().allow(""),
});

module.exports = {
  bookCreateSchema,
  bookUpdateSchema
};
