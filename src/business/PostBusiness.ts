import {PostDatabase} from "../data/PostDatabase";
import {IdGenerator} from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export class PostBusiness {

    public async newPost(image: string, description: string, type: string, id_user) {
        const idCreator = new IdGenerator()
        const id = idCreator.generate()

        return new PostDatabase().createPost(id, image, description, type, id_user);
    }
}