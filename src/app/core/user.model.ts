export class User {
    id                        : number;
    jwt?                      : string;
    username                  : string;
    email                     : string;
    bio                       : string;
    status                    : string;
    entry_count?              : number;
    be_upvoted_count?         : number;
    be_downvoted_count?       : number;
    create_time               : string;
    update_time               : string;
}
