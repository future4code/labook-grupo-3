import { BaseDataBase } from "./BaseDatabase";


export class RefreshTokenDatabase extends BaseDataBase {
    tableName: string = "RefreshTokenAndrius";

    public async createRefreshToken(
        token:string,
        device:string,
        isActive:boolean,
        userId:string
    ): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${RefreshTokenDatabase.tableName} (refresh_token, device, is_active, user_id) 
            VALUES(
                "${token}",
                "${device},
                ${this.convertBooleanToTinyint(isActive)},
                "${userId}
            )
        `)
    }

    public async getRefreshToken(token:string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${RefreshTokenDatabase.tableName} 
            WHERE refresh_token = "${token}"
        `)

        const refreshTokenDb = result[0][0]

        return {
            refreshToken: refreshTokenDb.refresh_token,
            device: refreshTokenDb.device,
            userId: refreshTokenDb.user_id,
            isActive: this.convertTinyintToBoolean(refreshTokenDb.is_active)
        }
    }

    // public async signup(name: string, email: string, id: string, password: string) {
    //     return await super.getConnection()
    //         .insert({
    //             id,
    //             name,
    //             email,
    //             password
    //         })
    //         .into(this.tableName)
    // }

    // public async getUserEmail(email: string): Promise<any> {
    //     const result = await this.getConnection()
    //         .select("*")
    //         .from(this.tableName)
    //         .where({ email });

    //     return result[0];
    // }

    // public async addNewFriendship(id_inviter: string, id_invited: string): Promise<any> {
    //     await this.getConnection().insert({ id_inviter, id_invited }).into('RelationsLabook')
    // }

    // public async deleteFriendship(id_invited: string): Promise<any> {
    //     await this.getConnection().delete().from('RelationsLabook').where({ id_invited })
    // }

}