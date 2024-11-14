import express from "express";
import {login} from "../controllers/loginControllers.js";
import {signUp} from "../controllers/signupController.js";

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/signup',signUp)

export default authRouter;