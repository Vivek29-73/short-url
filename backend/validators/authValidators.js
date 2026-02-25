const {body,validationResult}=require("express-validator");

const validateRegister=[
    body("email")
    .isEmail()
    .withMessage("plaese provide a vlaid email"),

    body("password")
    .isLength({min:6})
    .withMessage("password must be at least 6 characters"),

    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
];

const validateLogin=[
    body("email")
    .notEmpty()
    .withMessage("email is required"),

    body("password")
    .notEmpty()
    .withMessage("password is required"),

    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});

        }
        next();
    }

];

module.exports={validateRegister,validateLogin};