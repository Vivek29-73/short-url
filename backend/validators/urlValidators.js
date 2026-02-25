const { body, validationResult } = require("express-validator");

const validateUrl = [
    body("originalUrl")
        .isURL()
        .withMessage("Please provide a valid URL"),

   body("customAlias")
        .optional()
        .isAlphanumeric()
        .withMessage("Alias can only contain letters and numbers")
        .isLength({ min: 3, max: 20 })
        .withMessage("Alias must be between 3 and 20 characters"),

    body("expiresInDays")
        .optional()
        .isInt({ min: 1, max: 365 })
        .withMessage("Expiry must be between 1 and 365 days"),
        
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUrl };
