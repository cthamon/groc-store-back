import { body } from 'express-validator';

const userValidator = {
    checkRefreshToken: () => {
        return [
            body("refreshToken")
                .notEmpty().withMessage("refresh token is required")
        ];
    },
    checkRegister: () => {
        return [
            body("email")
                .notEmpty().withMessage("e-mail is required")
                .isEmail().withMessage("invalid email format"),
            body("firstName")
                .notEmpty().withMessage("first name is required")
                .isString().withMessage("first name must be string")
                .custom((firstName) => {
                    if (!/^[A-Z]+$/i.test(firstName)) throw new Error("first name must be alphabet letters");
                    return true;
                }),
            body("lastName")
                .notEmpty().withMessage("last name is required")
                .isString().withMessage("last name must be string")
                .custom((firstName) => {
                    if (!/^[A-Z]+$/i.test(firstName)) throw new Error("last name must be alphabet letters");
                    return true;
                }),
            body("password")
                .notEmpty().withMessage("password is required")
                .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
            body("confirmPassword")
                .notEmpty().withMessage("confirm password is required")
                .custom((confirmPassword, { req }) => {
                    if (confirmPassword !== req.body.password) throw new Error("confirm password does not match password");
                    return true;
                }),
            body("address")
                .notEmpty().withMessage("address is required")
        ];
    },
    checkUpdate: () => {
        return [
            body("firstName")
                .optional()
                .isString().withMessage("first name must be string")
                .custom((firstName) => {
                    if (!/^[A-Z]+$/i.test(firstName)) throw new Error("first name must be alphabet letters");
                    return true;
                }),
            body("lastName")
                .optional()
                .isString().withMessage("last name must be string")
                .custom((firstName) => {
                    if (!/^[A-Z]+$/i.test(firstName)) throw new Error("last name must be alphabet letters");
                    return true;
                }),
            body("address")
                .optional()
                .isString().withMessage("last name must be string"),
        ];
    },
    checkLogin: () => {
        return [
            body("email")
                .notEmpty().withMessage("e-mail is required")
                .isEmail().withMessage("invalid email format"),
            body("password")
                .notEmpty().withMessage("password is required")
                .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        ];
    },
    checkChangePassword: () => {
        return [
            body("currentPassword")
                .notEmpty().withMessage("current password is required"),
            body("newPassword")
                .notEmpty().withMessage("new password is required")
                .isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
            body("confirmPassword")
                .notEmpty().withMessage("confirm Password is required")
                .custom((confirmPassword, { req }) => {
                    if (confirmPassword !== req.body.newPassword) throw new Error("confirm password does not match new password");
                    return true;
                }),
        ];
    },
};

export default userValidator;