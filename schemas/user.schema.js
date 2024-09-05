const Joi = require("joi");

exports.userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  user_name: Joi.string().max(50).required(),
  gender: Joi.string().valid("male", "female").required(),
  country: Joi.string().max(50).required(),
  avatar: Joi.string()
    .uri()
    .max(1000)
    .regex(/\.(jpeg|jpg|gif|png)$/i)
    .optional(),
  phone: Joi.string().max(15).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});