import express from 'express';

import { upload } from '../services/multer';
import userController from '../controllers/userController';
import userValidator from '../validator/userValidator';
import validatorHandler from '../middlewares/validatorHandler';
import { adminProtect, protect } from '../middlewares/protect';

const router = express.Router();

router.get("/health", userController.check);
router.get("/me", protect, userController.info);
router.get("/all", adminProtect, userController.allInfo);
router.post("/refresh", userValidator.checkRefreshToken(), validatorHandler, userController.refresh);
router.post("/login", userValidator.checkLogin(), validatorHandler, userController.login);
router.post("/register", upload.single("profile"), userValidator.checkRegister(), validatorHandler, userController.register);
router.patch("/update", upload.single("profile"), userValidator.checkUpdate(), validatorHandler, protect, userController.update);
router.patch("/password", userValidator.checkChangePassword(), validatorHandler, protect, userController.changePassword);

export default router;