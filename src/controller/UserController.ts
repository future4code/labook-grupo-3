import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
export class UserController {

    async signup(req: Request, res: Response) {
        try {
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const passwordHash = new HashManager()
            const hash = await passwordHash.hash(userData.password)
            const idCreator = new IdGenerator()
            const id = idCreator.generate()
            const tokenCreator = new Authenticator()
            const token = tokenCreator.generateToken({id})

            new UserBusiness().signup(userData.name, userData.email, id, hash)
            res.status(200).send({ token });
        } catch (err) {
            res.status(400).send({ err: err });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const userData = {
                email: req.body.email,
                password: req.body.password
            }

            if (userData.password.length < 6 || userData.email.length === 0 && !userData.email.includes("@")) {
                throw new Error('Oooops! E-mail ou senha são invalidos.');
              }
          
              const userDatabase: any = new UserDatabase();
              const user = await userDatabase.getUserEmail(userData.email);
          
              const hashManager = new HashManager();
              const comapreResult = await hashManager.compare(
                userData.password,
                user.password
              );
              
              if (!comapreResult) {
                throw new Error('Oooops! Senha incorreta.');
              }
          
              const authenticator = new Authenticator();
              const token = authenticator.generateToken({
                id: user.id
              });
          
              res.status(200).send({ token });
          
          
            } catch (err) {
              res.status(402).send({
                message: err.message
              });
            }
    }

    async startNewFriendship(req:Request, res:Response){
      try{
      const tokenCreator = new Authenticator()
      const verifyToken = tokenCreator.getData(req.headers.authorization as string)
      const userData = {
        id: req.body.id
      }
      const userManager = await new UserBusiness().addFriend(verifyToken.id, userData.id)
      res.status(200).send({
        message: 'you got a new friend!'
      })
    }
    catch(err){
      res.status(400).send({
        message: err.message
      })
    }
    }

    async deleteFriendship(req:Request, res:Response){
      try{
        const tokenCreator = new Authenticator()
        const verifyToken = tokenCreator.getData(req.headers.authorization as string)
        const userData = {
          id: req.body.id
        }
        const userManager = await new UserBusiness().deleteFriend(userData.id)
        res.status(200).send({
          message: 'Friendship finished'
        })
      }
      catch(err){
        res.status(400).send({
          message: err.message
        })
      }
    }
}