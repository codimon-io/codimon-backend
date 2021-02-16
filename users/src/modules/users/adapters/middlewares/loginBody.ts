import Joi from "joi";

export const loginBody = Joi.object({
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
