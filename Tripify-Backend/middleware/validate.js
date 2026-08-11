const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));
      return res.status(400).json({
        success: false,
        errors: messages,
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = validate;
