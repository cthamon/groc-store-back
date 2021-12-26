import { body } from 'express-validator';

const productValidator = {
    checkCreate: () => {
        return [
            body("title")
                .notEmpty().withMessage("title is required")
                .isString().withMessage("title must be string"),
            body("description")
                .notEmpty().withMessage("description is required")
                .isString().withMessage("description must be string"),
            body("price")
                .notEmpty().withMessage("price is required")
                .isNumeric().withMessage("price must be numeric"),
            body("type")
                .notEmpty().withMessage("type is required")
                .isString().withMessage("type must be string")
        ];
    },
    checkUpdate: () => {
        return [
            body("title")
                .optional()
                .isString().withMessage("title must be string"),
            body("description")
                .optional()
                .isString().withMessage("description must be string"),
            body("price")
                .optional()
                .isNumeric().withMessage("price must be numeric"),
            body("type")
                .optional()
                .isString().withMessage("type must be string")
        ];
    }
};

export default productValidator;