export class Alert {
  content: string;
  title: string;
  type: string = ALERT_TYPE.NORMAL;
  isCloseable: boolean = false;
}

export const ALERT_TYPE = {
  "SUCCESS": "success",
  "ERROR": "error",
  "INFO": "info",
  "WARNING": "warning",
  "NORMAL": ""
}
