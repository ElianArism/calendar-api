//https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

declare namespace Express {
  interface Request {
    username: string;
    _id: string;
  }
}
