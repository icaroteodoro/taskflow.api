import express, { Request, Response } from "express";
import { z } from "zod";
import { TaskService } from "./TaskService";

class TaskController {
  async findAllTasksByUserId(req: Request, res: Response) {
    const createRequisitionForFindTasksByUserId = z.object({
      userId: z.string(),
    });

    const { userId } = createRequisitionForFindTasksByUserId.parse(req.body);

    const taskService = new TaskService();
    const tasks = await taskService.findAllTasksByuserId(userId);

    return res.status(200).send(tasks);
  }

  async register(req: Request, res: Response) {
    const createTask = z.object({
      name: z.string(),
      description: z.string(),
      day: z.string(),
      userId: z.string(),
    });

    const taskBody = createTask.parse(req.body);

    const taskService = new TaskService();
    const task = await taskService.save(taskBody);

    return res.status(201).send(task);
  }
  async update(req: Request, res: Response) {
    const updateTask = z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      day: z.string(),
      isConfirmed: z.boolean(),
      userId: z.string(),
    });

    const taskBody = updateTask.parse(req.body);

    const taskService = new TaskService();
    const task = await taskService.update(taskBody);


    return res.status(200).send(task);
  }

  async delete(req: Request, res: Response) {
    const createRequestTaskDelete = z.object({
      taskId: z.string(),
    });

    const taskBody = createRequestTaskDelete.parse(req.body);

    const taskService = new TaskService();
    const task = await taskService.delete(taskBody.taskId);

    return res.status(task.status).send({message : task.message});
  } 
}

export { TaskController };
