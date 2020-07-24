import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IPewService } from "../../service";

export class PewSuggestionListRouteHandler implements IRouteHandler {
  private pewService: IPewService;

  constructor(pewService: IPewService) {
    this.pewService = pewService;
  }

  async handle(req: Request, res: Response) {
    const { status } = req.query as { status: string };
    const pews = await this.pewService.listPewSuggestions({
      status: status ? status.split(",") : undefined
    });
    res.json(pews);
  }
}
