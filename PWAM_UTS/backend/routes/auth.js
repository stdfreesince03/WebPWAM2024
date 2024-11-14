import express from "express";
import {login} from "../controllers/loginControllers.js";
import {signUp} from "../controllers/signupController.js";
import {loggedInStatus} from "../controllers/statusController.js";
import {logout} from "../controllers/logoutController.js";

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/signup',signUp);

authRouter.get('/auth/check',loggedInStatus);

authRouter.post('/logout',logout);

export default authRouter;