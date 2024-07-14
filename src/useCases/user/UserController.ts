import express, { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "./UserService";

class UserController {
  async findAllUsers(req: Request, res: Response) {
    const userService = new UserService();
    const users = await userService.getAllUsers();
    return res.send(users);
  }

  async register(req: Request, res: Response) {
    const createUser = z.object({
      name: z.string(),
      password: z.string(),
      email: z.string(),
    });
    const user = createUser.parse(req.body);
    const userService = new UserService();

    const newUser = await userService.save(user);

    return res.send(newUser);
  }

  async login(req: Request, res: Response){
    const createLogin = z.object({
        email: z.string(),
        password: z.string(),
      });
    
      const userRequest = createLogin.parse(req.body);
      const userService = new UserService();
      const token = await userService.login(userRequest);

      return res.send(token);

  }

  async update(req: Request, res: Response) {
    const createUpdateUserRequest = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    });

    const user  = createUpdateUserRequest.parse(req.body);

    const userService = new UserService();
    const userUpdated = await userService.update(user);


    return res.status(200).send(userUpdated);
  }
}

export { UserController };
