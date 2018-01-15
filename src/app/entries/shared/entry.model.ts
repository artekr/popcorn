import { Tag } from "./tag.model";
import { Comment } from "./comment.model";
import { User } from "../../core/user.model";

export class Entry {
    id            : number;
    name          : string;               //TODO: changed to 'name' in v3
    definition    : string;
    example       : string;
    status        : string;
    upVotesCount  : number;
    downVotesCount: number;
    commentCount  : number;
    create_time   : string;
    update_time?  : string;
    create_user?  : User;
    tags          : Array<Tag> = [];
    comments      : Array<Comment> = [];
}
