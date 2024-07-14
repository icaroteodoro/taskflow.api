import express from "express";
import {RefreshTokenController} from '../useCases/token/RefreshTokenController'; 

const router = express.Router();

const refreshTokenController = new RefreshTokenController();


router.post("/", refreshTokenController.generateRefreshToken);



export default router;
