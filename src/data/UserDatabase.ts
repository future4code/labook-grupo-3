import { BaseDataBase } from "./BaseDatabase";
import {v4} from "uuid";

export class UserDatabase extends BaseDataBase{
    tableName: string = "Users_arq";

    public async signup(name: string, email: string){
        return await super.getConnection().raw(`INSERT INTO Users_arq (id, name, email)
        VALUES ('${v4()}', '${name}', '${email}')`);
    }

}