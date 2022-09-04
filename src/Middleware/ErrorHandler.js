import { LogEvents } from "./LogEvent";

export const ErrorHandler = (err, req, res, next) => {
  LogEvents(`${err.name}: ${err.message}`, "errorLog.txt");
  res.status(500).send(err.message);
};
export default ErrorHandler;