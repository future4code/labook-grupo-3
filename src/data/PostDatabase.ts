import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDatabase";
import moment from 'moment'

export class PostDatabase extends BaseDataBase {
    tablename: string = "PostsLabook"


    public async createPost(
        id: string, 
        image: string, 
        description: string, 
        type: string, 
        id_user: string
        ):Promise<void> {
           const createdAt = moment().format('YYYY-MM-DD') 
            await this.getConnection().raw(`INSERT INTO PostsLabook(id, image, description,type, id_user, createdAt)
            VALUES(
                "${id}",
                "${image}",
                "${description}",
                "${type}",
                "${id_user}",
                "${createdAt}"
            )`)
        }

    public async getAllPosts():Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT * FROM sagan_andrius_db.PostsLabook 
        ORDER BY createdAt DESC;`)
        return result[0]
    }

    public async getPostsByType(type: string):Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT * FROM sagan_andrius_db.PostsLabook 
        WHERE type = "${type}" ORDER BY createdAt DESC;`)
        return result[0]
    }
}