import { User } from "../../core/user.model";
import { Entry } from "./entry.model";

export class Comment {
    id          : number;
    content     : string;
    status      : string;
    create_time : string;
    create_user : User;
    update_time : string;
    update_user : User;
    entry      ?: Entry;
}
