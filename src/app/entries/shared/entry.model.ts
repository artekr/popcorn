import { Tag } from "./tag.model";

export class Entry {
    id: number;
    name: string; //TODO: changed to 'name' in v3
    definition: string;
    example: string;
    status: string;
    create_time: string;
    tags: Array<Tag> = [];
}
