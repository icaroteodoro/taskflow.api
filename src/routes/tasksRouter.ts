import express, { Request, Response } from "express";
import { authenticateTasks, authenticateChangeTasks } from "../middlewares/verifyAuth";
import { TaskController } from "../useCases/task/TaskController";

const router = express.Router();


const taskController = new TaskController();

router.get("/find-by-user",authenticateTasks, taskController.findAllTasksByUserId);
router.post("/register", authenticateTasks,  taskController.register);
router.patch("/update",authenticateChangeTasks, taskController.update);
router.delete("/delete",authenticateChangeTasks, taskController.delete);



// Rota protegida de exemplo
router.get("/protected", authenticateChangeTasks, async (req: Request, res: Response) => {
  const user = req.user;
  res.send(
    `Hello ${user.name}, this is a protected route. Your email is ${user.email}`
  );
});

export default router;