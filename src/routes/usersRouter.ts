import express, { Request, Response } from "express";
import { authenticate } from "../middlewares/verifyAuth";
import { UserController } from "../useCases/user/UserController";

const router = express.Router();


const userController = new UserController();


router.get("/", userController.findAllUsers);
router.post("/register", userController.register);
router.put("/update", authenticate, userController.update);

router.post("/login", userController.login);



export default router;
