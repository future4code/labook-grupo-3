import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/createpost", new PostController().createPost)

postRouter.get("/feed", new PostController().feed)

postRouter.get("/feed/:type", new PostController().feedType)

postRouter.put("/unlike", new PostController().unlike)