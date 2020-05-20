import dotenv from "dotenv";
import { Request, Response } from "express";
import express from "express";
import { AddressInfo } from "net";
import knex from "knex";
import { v4 } from "uuid";
import { UserController } from "./controller/UserController";
import { userRouter } from "./routes/UserRouter";
import { postRouter } from "./routes/PostRouter";
import { commentsRouter } from "./routes/CommentRouter";

dotenv.config();
const app = express();
const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE_NAME
  }
})

app.use(express.json());

app.use("/users/", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter)

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "success" });
})

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});