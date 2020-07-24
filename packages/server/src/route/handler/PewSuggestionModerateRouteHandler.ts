import { Request, Response } from "express";
import { IPewService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class PewSuggestionModerateRouteHandler implements IRouteHandler {
  private pewService: IPewService;
  constructor(pewService: IPewService) {
    this.pewService = pewService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const pew = await this.pewService.moderateSuggestion(
      req.params.id,
      req.body
    );
    res.json(pew);
  }
}
