import bcrypt from "bcryptjs";
import prisma from "../../prisma/client";

import { GenerateRefreshTokenProvider } from "../../providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IUserAuthRequest {
  email: string;
  password: string;
}

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async save({ name, email, password }: IUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
        ],
      },
    });
    if (!userExists) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return user;
    } else {
      throw new Error("User already exists");
    }
  }

  async login({ email, password }: IUserAuthRequest) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    //   VERIFICANDO SE USUARIO EXISTE
    if (!user) {
      throw new Error("User not found");
    }

    //   VERIFICANDO SENHA
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const generateToken = new GenerateTokenProvider();
    const token = await generateToken.generate(user.id);

    const generateRefreshToken = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshToken.generate(user.id);

    return { token, refreshToken: refreshToken.token };
  }

  async update({ id, name, email }) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email
      },
    });

    return user;
  }
}

export { UserService };
