import { PostDatabase } from "../data/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {

    public async newPost(image: string, description: string, type: string, id_user: string) {
        const idCreator = new IdGenerator()
        const id = idCreator.generate()

        return await new PostDatabase().createPost(id, image, description, type, id_user);
    }

    public async getFeed() {
        return await new PostDatabase().getAllPosts();
    }

    public async getFeedType(type: string) {
        return await new PostDatabase().getPostsByType(type)
    }

    public async unLike(idUser: string, idPost: string) {

        return await new PostDatabase().setUnlikePost(idUser, idPost)

    }
    public async setLike(id_user: string, id_post: string) {
        return await new PostDatabase().likePost(id_user, id_post)

    }
}