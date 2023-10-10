import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "./error";

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies["access-token"];
  if (!token) return next(handleError(401, "No token provided"));
  jwt.verify(
    token,
    process.env.JWT_SECRET! as string,
    (err: any, decoded: any) => {
      if (err) return next(handleError(401, "Invalid token"));
      //@ts-ignore
      request.user = decoded;
      next();
    }
  );
};
