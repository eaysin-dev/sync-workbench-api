import { NextFunction, Request, Response } from "express";

const updatePatch = (req: Request, res: Response, next: NextFunction) => {
  console.log("udpate patch");

  res.end();
};

export default updatePatch;
