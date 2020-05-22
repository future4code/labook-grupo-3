import { BaseDataBase } from "./BaseDatabase";


export class RefreshTokenDatabase extends BaseDataBase {
    tableName: string = "RefreshTokenAndrius";

    public async createRefreshToken(
        token:string,
        device:string,
        isActive:boolean,
        userId:string
    ): Promise<void> {
        // console.log("olha ae")
        // console.log(token)
        // console.log(device)
        // console.log(isActive)
        // console.log(userId)
        await this.getConnection().raw(`
            INSERT INTO RefreshTokenAndrius (refresh_token, device, is_active, user_id) 
            VALUES(
                "${token}",
                "${device}",
                ${this.convertBooleanToTinyint(isActive)},
                "${userId}"
            )
        `)
    }

    public async getRefreshToken(token:string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM RefreshTokenAndrius 
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

    public async getRefreshTokenByUserIdAndDevice(userId:string, device:string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM RefreshTokenAndrius 
            WHERE user_id = "${userId}" AND device = "${device}"
        `)

        const refreshTokenDb = result[0][0]

        if (refreshTokenDb === undefined){
            return undefined
        }

        return {
            refreshToken: refreshTokenDb.refresh_token,
            device: refreshTokenDb.device,
            userId: refreshTokenDb.user_id,
            isActive: this.convertTinyintToBoolean(refreshTokenDb.is_active)
        }
    }

    public async deleteRefreshToken(token:string){
        await this.getConnection().raw(`
            DELETE FROM RefreshTokenAndrius 
            WHERE refresh_token = "${token}"
        `)
    }
}