import React from "react";
import { IGame } from "../../../../interfaces/IGame";
import { UpdateGame } from "./UpdateGame";
import { CreateGame } from "./CreateGame";

export const Game = () => {
  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState<IGame | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:4040/game")
      .then(res => res.json())
      .then(res => {
        setGame(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div>
      {game ? (
        <UpdateGame game={game} setGame={setGame} />
      ) : (
        <CreateGame setGame={setGame} />
      )}
    </div>
  );
};
