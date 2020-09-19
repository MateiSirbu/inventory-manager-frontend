import { IUser } from "inventory-interfaces/user"

export class User implements IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    public constructor(init?: Partial<User>)
    {
        Object.assign(this, init)
    }
}
