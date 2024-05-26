import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { verifyAuth } from "./midlleware/verifyAuth";

export const router = Router()

const usercontroller = new UserController()
const loginController = new LoginController()

router.post("/user" , usercontroller.createUser)
router.get('/user/:userId', verifyAuth , usercontroller.getUser)
router.delete('/user', usercontroller.deleteUser)

router.post('/login', loginController.login)