import {Request, Response} from "express";
import { UserBusiness } from "../business/UserBusiness";
export class UserController{
    
    signup(req: Request, res: Response){
        try{
            new UserBusiness().signup(req.body.name, req.body.email)
            .then((result)=>{
                res.status(200).send({ message: "Usuário criado com sucesso" });
            })
        }catch(err){
            res.status(400).send({ err: err });
        }
    }
}