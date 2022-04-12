import {body} from "express-validator";

export const titleValidationParams = body('title')
    .isLength({min: 1, max: 100})
    .withMessage('min-max 1-100 symbols')
    .isString()
    .withMessage('input value must be a string')
