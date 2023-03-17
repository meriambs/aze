const { body, validationResult } = require("express-validator");

exports.registerValidator = [
  body("email", "please enter a valid email").isEmail(),
  body("password", "please put a password with 6 characters min").isLength({
    min: 6,
  }),
];

exports.loginValidator = [
  body("email", "please enter a valid email").isEmail(),
];

exports.validation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
