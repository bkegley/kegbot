import { Request, Response } from "express";
import { IRouteHandler } from "./IRouteHandler";
import { IGameService } from "../../service";

export class GameGetRouteHandler implements IRouteHandler {
  private gameService: IGameService;

  constructor(gameService: IGameService) {
    this.gameService = gameService;
  }

  async handle(req: Request, res: Response) {
    const game = await this.gameService.getGame().catch(err => {
      res.status(403).send(err);
    });
    res.json(game);
  }
}
