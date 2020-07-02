import { Request, Response } from "express";

export interface IRouteHandler {
  handle(req: Request, res: Response): void;
}
