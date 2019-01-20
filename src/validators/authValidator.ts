import { body } from "express-validator/check";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email field is required.")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("name")
    .exists()
    .withMessage("Name field is required.")
    .isString()
    .withMessage("Name must be a string.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must contain more than 3 but less than 30 symbols."),
  body("password")
    .exists()
    .withMessage("Password field is required.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/)
    .withMessage(
      "Password should be at least 8 symbols long, contain at least one number and one letter."
    ),
  body("password2")
    .exists()
    .withMessage("Password confirmation field is required.")
];
