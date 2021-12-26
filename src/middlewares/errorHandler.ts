import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.message === "You are not authorized" ||
        err.message === "invalid signature" ||
        err.message === "jwt expired") return res.status(403).json({ message: err.message });
    return res.status(500).json({ message: err.message });
};

export default errorHandler;