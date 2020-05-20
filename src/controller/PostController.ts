import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {

    public async createPost(req: Request, res: Response) {
        try {

            const postData = {
                image: req.body.image,
                description: req.body.description,
                type: req.body.type
            }

            const token = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(token);

            new PostBusiness().newPost(postData.image, postData.description, postData.type, authenticator.id as string)

            res.status(200).send({
                message: "Post created"
            })

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    public async feed(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(token);

            const feed = await new PostBusiness().getFeed()

            res.status(200).send({
                feed: feed
            })

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    public async feedType(req: Request, res: Response) {
        try {
            const type = req.params.type
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(token);

            const feed = await new PostBusiness().getFeedType(type)

            res.status(200).send({
                feed: feed
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    public async likePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(token);
            await new PostBusiness().setLike(authenticator.id, req.params.id)
            res.status(200).send({
                message: 'success'
            })
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
}