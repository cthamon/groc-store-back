import { Request, Response, NextFunction } from 'express';
import config from 'config';
import * as jwt from 'jsonwebtoken';

import { Payload } from '../types';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer\s/, "");
        if (!token) throw new Error("you are not authorized");
        const { id } = await jwt.verify(token, config.get<string>("ACCESS_TOKEN")) as Payload;
        res.locals.id = id;
        next();
    } catch (error) {
        next(error);
    }
};

export const adminProtect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer\s/, "");
        if (!token) throw new Error("you are not authorized");
        const { id, email } = await jwt.verify(token, config.get<string>("ACCESS_TOKEN")) as Payload;
        if (email !== "c.tm@gmail.com") throw new Error("you are not authorized");
        res.locals.id = id;
        next();
    } catch (error) {
        next(error);
    }
};