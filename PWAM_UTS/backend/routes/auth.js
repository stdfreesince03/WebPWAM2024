import express from "express";
import {loginController} from "../controllers/loginControllers";

const router = express.Router();

router.get('/login', loginController);

export default router;