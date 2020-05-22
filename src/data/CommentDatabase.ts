// import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDatabase";
// import moment from 'moment';

export class CommentDatabase extends BaseDataBase{
    tablename: string = "CommentsLabook"

    public async commentPost(
        id: string,
        id_user: string, 
        id_post: string, 
        comment: string
        ): Promise<void> {
            await this.getConnection().raw(`
            INSERT INTO ${this.tablename}(id, id_user, id_post, comment)
            VALUES(
            "${id}",
            "${id_user}",
            "${id_post}",
            "${comment}"
            )`)
        }
}

