import dotenv from "dotenv";
import { Request, Response } from "express";
import express from "express";
import { AddressInfo } from "net";
import knex from "knex";
import { v4 } from "uuid";
import { UserController } from "./controller/UserController";
import { userRouter } from "./routes/UserRouter";

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

//rota do endpoint.             função do que é executado quando o endpoint é chamado

app.use("/users/", userRouter);

// app.get("/users/:id", (req: Request, res: Response)=>{
//   const id = req.params.id;
//   try{
//     connection.raw(`SELECT * FROM Users_arq WHERE id = '${id}'`).then((result)=>{
//        const user = result[0][0];
//         if(user.isApproved===0){
//           res.status(400).send({ err: "Usuário ainda não foi aprovado" });
//         }else{
//           res.status(200).send({...user, isApproved: user.isApproved!==0});
//         }

//     })
//     .catch((error)=>{
//       res.status(400).send({ err: error });
//     })

//   }catch(err){
//     res.status(400).send({ err: err });
//   }
// })

// app.post("/users/approve", async (req: Request, res: Response)=>{
//   const id = req.body.id;

//   try{
//     const queryResult = await connection.raw(`SELECT * from Users_arq WHERE id = '${id}'`);
//     const user = queryResult[0][0];

//     if(user.isApproved!==0){
//       throw new Error("Usuário já está aprovado!");
//     }else{
//       await connection.raw(`UPDATE Users_arq SET isApproved = 1 WHERE id = '${id}'`);
//     }

//     res.status(200).send({message: "Usuário aprovado!"});

//   }catch(err){
//     res.status(400).send({error: err.message})
//   }

// })

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