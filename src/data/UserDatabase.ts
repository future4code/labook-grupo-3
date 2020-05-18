import { BaseDataBase } from "./BaseDatabase";
import {v4} from "uuid";

export class UserDatabase extends BaseDataBase{
    tableName: string = "UsersLabook";

    public async signup(name: string, email: string, id:string, password:string){
        console.log(name, email, id, password)
        return await super.getConnection()
            .insert({
                id,
                name,
                email,
                password
            })
            .into(this.tableName)

        // return await super.getConnection()
        //     .select("*")
        //     .from("UsersLabook")

        //raw(`INSERT INTO ${this.tableName} (name, email, id, password)
        //VALUES ('${name}', '${email}', '${id}', '${password}')`);
    }

    public async getUserEmail(email: string): Promise<any> {
        const result = await this.getConnection()
          .select("*")
          .from(this.tableName)
          .where({ email });
    
        return result[0];
      }

}