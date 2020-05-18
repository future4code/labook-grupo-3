import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness{

    public async signup(name: string, email: string){
        return new UserDatabase().signup(name, email);
    }
}