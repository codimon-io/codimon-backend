import Joi from "joi";

export const signupBody = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .min(2)
    .max(50)
    .required(),
  password: Joi.string()
    .min(4)
    .max(50)
    .required(),
});
