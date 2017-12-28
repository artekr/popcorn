export class Alert {
  message    : string;
  title      : string;
  type       : AlertType = AlertType.Normal;
  isCloseable: boolean = false;
}

export enum AlertType {
  Success = "success",
  Error   = "error",
  Info    = "info",
  Warning = "warning",
  Normal  = ""
}
