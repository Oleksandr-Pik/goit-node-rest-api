import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exist`,
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
    "string.base": `"phone" must be text`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" must be text`,
  }),
});
