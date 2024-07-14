import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta"; // SECRET_KEY_JWT Use uma chave secreta segura

// const REFRESH_TOKEN_SECRET = "your_refresh_token_secret";

// Middleware de autenticação
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {id: string, email: string };
    
    const user = await prisma.user.findFirst({ where: { email: decoded.email } });

    if (!user) return res.status(404).send('User not found');
    (req as any).body.id = user.id;

    
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};


export const authenticateChangeTasks = async (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { email: string };
    const user = await prisma.user.findFirst({ where: { email: decoded.email } });

    if (!user) return res.status(404).send('User not found');
    

    const task = await prisma.task.findFirst({
      where: {
        id: req.body.id ?? req.body.taskId
      }
    });

    if(!task) return res.status(404).send('Task not found');

    if(task.userId != user.id) return res.status(404).send('You do not have permission')
    (req as any).body.userId = user.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
} 

export const authenticateTasks = async (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { email: string };
    const user = await prisma.user.findFirst({ where: { email: decoded.email } });

    if (!user) return res.status(404).send('User not found');

    (req as any).body.userId = user.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
} 


