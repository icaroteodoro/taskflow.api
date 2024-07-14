import prisma from "../../prisma/client";

interface ITask {
    name: string;
    description: string;
    day: string;
    userId: string;
}
interface ITaskUpdate {
    id: string,
    name: string;
    description: string;
    day: string;
    userId: string;
    isConfirmed: boolean;
}

class TaskService {
    async findAllTasksByuserId(userId: string){
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });

        return tasks;
    }

    async save({name, description, day, userId} : ITask) {
        const task = await prisma.task.create({
            data: {
                name, 
                description,
                day,
                userId,
                isConfirmed: false
            }
        });
        return task;
    }

    async update({id, name, description, day, isConfirmed, userId} : ITaskUpdate) {
        const task = await prisma.task.update({
            where: {
                id
            }, data: {
                name, 
                description,
                day,
                isConfirmed,
                userId,
            }
        });
        return task;
    }

    async delete(id: string){
        try{
            await prisma.task.delete({
                where: {
                    id
                }
            });
            return ({
                status: 200,
                message: "Task deleted successfully"
            });
        }catch(err){
            return {
                error: err,
                message: "Task does not exist",
                status: 404
            }; 
        }
    }
    

}

export {TaskService};