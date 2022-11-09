import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload {
  id: string;
}

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-api-key");

  if (!token) {
    res.send({ authentication: false });
  } else {
    try {
      let user = jwt.verify(token, process.env.accessKeyID) as JwtPayload;
      const userData = await User.find({
        _id: { $in: user.id },
      });

      res.locals = { authentication: true, userData };
      next();
    } catch (error) {
      res.send({ authentication: false });
    }
  }
};

export { verifyAuth };
