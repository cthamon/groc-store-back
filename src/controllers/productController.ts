import { Request, Response, NextFunction } from 'express';

import Product from '../services/productService';

const productController = {
    check: (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
    allProduct: (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = Product.findAll();
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    create: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description, price, type } = req.body;
            const productImg = req.file?.filename;
            const product = Product.create({ title, description, price, type, productImg });
            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { title, description, price, type } = req.body;
            let productImg = undefined;
            if (req.file) productImg = req.file?.filename;
            const result = Product.update(id, { title, description, price, type, productImg });
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            Product.deleteById(id);
            return res.status(200).json({ message: "product has been successfully deleted" });
        } catch (error) {
            next(error);
        }
    }
};

export default productController;