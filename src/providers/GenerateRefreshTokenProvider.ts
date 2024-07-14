import prisma from "../prisma/client";
import jwt from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = "your_refresh_token_secret";

class GenerateRefreshTokenProvider {
    async generate(userId: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        const verifyRefreshTokenAlredyExists = await prisma.refreshToken.findFirst({
            where: {
                userId: userId,
            }
        }); 

        if(verifyRefreshTokenAlredyExists) {
            await prisma.refreshToken.delete({
                where: {
                    id: verifyRefreshTokenAlredyExists.id
                }
            });
        }

        if(!user) throw new Error("User does not exist");

        const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET);
        const generateRefreshToken  = await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId
            }
        });

        return generateRefreshToken;
    }
}

export {GenerateRefreshTokenProvider};