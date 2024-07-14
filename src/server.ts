
import "express-async-errors";
import express, {Request, Response, NextFunction} from "express";

import cors from "cors";
import bodyParser from "body-parser";

import user from "./routes/usersRouter";
import task from "./routes/tasksRouter";
import refreshTokenRouter from "./routes/refreshtokenRouter";


const app = express();


app.use(bodyParser.json());
app.use(cors());

app.use("/users", user);
app.use("/tasks", task);
app.use("/refresh-token", refreshTokenRouter);


app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message
  })
});



const PORT = 8080;


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
