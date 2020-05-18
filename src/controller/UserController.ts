import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
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
}