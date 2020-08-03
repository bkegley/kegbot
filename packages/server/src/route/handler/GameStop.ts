import { Request, Response } from "express";
import { IRouteHandler } from "./IRouteHandler";
import { IGameService } from "../../service";

export class GameStopRouteHandler implements IRouteHandler {
  private gameService: IGameService;

  constructor(gameService: IGameService) {
    this.gameService = gameService;
  }

  async handle(req: Request, res: Response) {
    this.gameService.stopGame();
    res.json(true);
  }
}
