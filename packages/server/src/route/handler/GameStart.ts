import { Request, Response } from "express";
import { IRouteHandler } from "./IRouteHandler";
import { IGameService } from "../../service";

export class GameStartRouteHandler implements IRouteHandler {
  private gameService: IGameService;

  constructor(gameService: IGameService) {
    this.gameService = gameService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const game = this.gameService.startGame(req.body);
    res.json(game);
  }
}
