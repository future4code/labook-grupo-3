import express from "express";
import { CommentController} from "../controller/CommentController"; 

export const commentsRouter = express.Router(); 

commentsRouter.post("/commentpost", new CommentController().commentPost)

