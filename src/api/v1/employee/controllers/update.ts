import { NextFunction, Request, Response } from "express";

const update = (req: Request, res: Response, next: NextFunction) => {
  console.log("update");

  res.end();
};

export default update;
