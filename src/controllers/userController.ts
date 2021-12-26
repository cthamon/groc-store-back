import { Request, Response, NextFunction } from 'express';
import config from 'config';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../services/userService';
import { Payload } from '../types';

const userController = {
    check: (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
    allInfo: (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = User.findAll();
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    info: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals;
            const result = User.findById(id);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, firstName, lastName, address } = req.body;
            const profileImg = req.file?.filename;
            const hashedPassword = await bcrypt.hash(password, config.get("BCRYPT_SALT"));
            const user = User.create({ email, password: hashedPassword, firstName, lastName, profileImg, address });
            const payload = { id: user.id, email: user.email };
            const accessToken = jwt.sign(payload, config.get<string>("ACCESS_TOKEN"), { expiresIn: "5m" });
            const refreshToken = jwt.sign(payload, config.get<string>("REFRESH_TOKEN"), { expiresIn: "7d" });
            return res.status(201).json({ accessToken, refreshToken });
        } catch (error) {
            next(error);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password }: { email: string; password: string; } = req.body;
            const user = User.findOne({ email });
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) throw new Error("e-mail or Password is incorrect");
            const payload = { id: user.id, email: user.email };
            const accessToken = jwt.sign(payload, config.get<string>("ACCESS_TOKEN"), { expiresIn: "5m" });
            const refreshToken = jwt.sign(payload, config.get<string>("REFRESH_TOKEN"), { expiresIn: "7d" });
            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            next(error);
        }
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals;
            const { firstName, lastName, address } = req.body;
            let profileImg = undefined;
            if (req.file) profileImg = req.file?.filename;
            const result = User.update(id, { firstName, lastName, profileImg, address });
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    changePassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals;
            const { currentPassword, newPassword } = req.body;
            const user = User.findById(id);
            const comparePassword = await bcrypt.compare(currentPassword, user.password);
            if (!comparePassword) throw new Error("current password is incorrect");
            const hashedPassword = await bcrypt.hash(newPassword, config.get("BCRYPT_SALT"));
            User.update(id, { password: hashedPassword });
            return res.status(200).json({ message: "password has been successfully changed" });
        } catch (error) {
            next(error);
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            const payload = await jwt.verify(refreshToken, config.get<string>("REFRESH_TOKEN")) as Payload;
            if (!payload) throw new Error("you are not authorized");
            const accessToken = jwt.sign({ id: payload.id, email: payload.email }, config.get<string>("ACCESS_TOKEN"), { expiresIn: "5m" });
            return res.json({ accessToken });
        } catch (error) {
            next(error);
        }
    }
};

export default userController;