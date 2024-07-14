import express, { Request, Response, NextFunction } from "express";
import { RefreshTokenService } from "./RefreshTokenService";

class RefreshTokenController {
    async generateRefreshToken(req: Request, res: Response){
        const {refreshToken} = req.body;

        const refreshTokenService = new RefreshTokenService();
        const {token, newRefreshToken } = await refreshTokenService.generateNewToken(refreshToken);

        return res.send({token, refreshToken: newRefreshToken});
    }

}

export { RefreshTokenController };