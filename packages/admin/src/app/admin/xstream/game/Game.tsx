import React from "react";
import { IGame } from "../../../../interfaces/IGame";
import { Link, useRouteMatch } from "react-router-dom";

export const Game = () => {
  const match = useRouteMatch();
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
      <div className="flex justify-end w-full mb-10">
        {game ? (
          <div>
            <Link to={`${match.url}/update`} className="btn btn-primary">
              Update
            </Link>
          </div>
        ) : (
          <div>
            <Link to={`${match.url}/create`} className="btn btn-primary">
              Start
            </Link>
          </div>
        )}
      </div>
      {game ? (
        <div className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
          <div className="w-full p-6">
            <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
              Game
            </h3>
            <div className="mt-4 grid grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 leading-5">
                  Reward Multiplier
                </dt>
                <dd className="mt-1 text-sm text-gray-900 leading-5">
                  {game.options.rewardMultiplier}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 leading-5">
                  Difficulty Modifier
                </dt>
                <dd className="mt-1 text-sm text-gray-900 leading-5">
                  {game.options.difficultyModifier}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 leading-5">
                  Phone Frequency Modifier
                </dt>
                <dd className="mt-1 text-sm text-gray-900 leading-5">
                  {game.options.phoneFrequencyMultiplier}
                </dd>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No game found. You should start one.</div>
      )}
    </div>
  );
};
