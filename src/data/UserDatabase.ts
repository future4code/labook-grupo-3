import { BaseDataBase } from "./BaseDatabase";
import {v4} from "uuid";

export class UserDatabase extends BaseDataBase{
    tableName: string = "UsersLabook";

    public async signup(name: string, email: string, id:string, password:string){
        console.log(name, email, id, password)
        return await super.getConnection().raw(`INSERT INTO ${this.tableName} (name, email, id, password)
        VALUES ('${name}', '${email}', '${id}', '${password}')`);
    }

}