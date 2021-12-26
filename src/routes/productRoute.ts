import express from 'express';

import { upload } from '../services/multer';
import productController from '../controllers/productController';
import productValidator from '../validator/productValidator';
import validatorHandler from '../middlewares/validatorHandler';
import { adminProtect } from '../middlewares/protect';

const router = express.Router();

router.get("/health", productController.check);
router.get("/", productController.allProduct);
router.post("/create", adminProtect, upload.single("productImg"), productValidator.checkCreate(), validatorHandler, productController.create);
router.patch("/:id", upload.single("productImg"), productValidator.checkUpdate(), validatorHandler, productController.update);
router.delete("/:id", adminProtect, productController.delete);

export default router;