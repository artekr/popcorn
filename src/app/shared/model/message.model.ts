export class Message {
    content: string;
    title: string;
    type: string = MESSAGE_TYPE.NORMAL;
}

export const MESSAGE_TYPE = {
    "SUCCESS": "success",
    "ERROR": "error",
    "INFO": "info",
    "WARNING": "warning",
    "NORMAL": ""
}