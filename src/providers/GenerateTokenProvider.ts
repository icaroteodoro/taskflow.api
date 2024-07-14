import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

// const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta";
const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta";

class GenerateTokenProvider {
  async generate(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    

    if(!user) throw new Error("User not found");

    const token = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    return token;
  }
}

export { GenerateTokenProvider };
