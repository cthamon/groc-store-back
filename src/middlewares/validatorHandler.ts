import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).formatWith(({ msg }: ValidationError) => ({ message: msg }));
    if (!error.isEmpty()) {
        return res.status(400).json(error.array({ onlyFirstError: true }));
    }
    next();
};

export default validatorHandler;