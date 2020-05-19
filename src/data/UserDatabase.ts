import { BaseDataBase } from "./BaseDatabase";

export class UserDatabase extends BaseDataBase {
    tableName: string = "UsersLabook";

    public async signup(name: string, email: string, id: string, password: string) {
        console.log(name, email, id, password)
        return await super.getConnection()
            .insert({
                id,
                name,
                email,
                password
            })
            .into(this.tableName)
    }

    public async getUserEmail(email: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(this.tableName)
            .where({ email });

        return result[0];
    }

    public async addNewFriendship(id_inviter: string, id_invited: string): Promise<any> {
        await this.getConnection().insert({ id_inviter, id_invited }).into('RelationsLabook')
    }

    public async deleteFriendship(id_invited: string): Promise<any> {
        await this.getConnection().delete().from('RelationsLabook').where({ id_invited })
    }

}