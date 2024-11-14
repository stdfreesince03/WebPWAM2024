import express from "express";
import {login} from "../controllers/loginControllers.js";
import {signUp} from "../controllers/signupController.js";
import {loggedInStatus} from "../controllers/statusController.js";

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/signup',signUp);

authRouter.get('/auth/check',loggedInStatus);

export default authRouter;