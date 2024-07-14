import prisma from "../../prisma/client";
import { GenerateRefreshTokenProvider } from "../../providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";




class RefreshTokenService {
    async generateNewToken(refreshToken : string ) {
        const verifyRefreshToken = await prisma.refreshToken.findFirst({
          where : {
            token: refreshToken
          }
        });
    
        if(!verifyRefreshToken){
          throw new Error('Invalid refresh token');
        }
        const userId = verifyRefreshToken.userId;
    
        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.generate(verifyRefreshToken.userId);
    
        await prisma.refreshToken.delete({
          where: {
            id: verifyRefreshToken.id,
          }
        });
        const generateRefreshToken = new GenerateRefreshTokenProvider();
        const newRefreshToken = await generateRefreshToken.generate(userId);
        
        return { token, newRefreshToken };
    }

}

export {RefreshTokenService};