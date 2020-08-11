import React from "react";
import { Label, Input, Button } from "../../../../components";
import { Formik, Form, Field } from "formik";
import { RouteChildrenProps, Link } from "react-router-dom";
import { IGame } from "../../../../interfaces/IGame";

export interface UpdateGameProps extends RouteChildrenProps {}

export const UpdateGame = ({ history, match }: UpdateGameProps) => {
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

  if (!game) {
    return <div>there is no game</div>;
  }

  const stopGame = () => {
    fetch("http://localhost:4040/game/stop", { method: "POST" })
      .then(res => res.json())
      .then(() => {
        history.push(match.url.replace("/update", ""));
      })
      .catch(console.error);
  };

  return (
    <div>
      <div className="text-indigo-600">
        <Link to={match.url.replace("/update", "")}>{"<< Go Back"}</Link>
      </div>
      <Formik
        initialValues={{
          difficultyModifier: game.options.difficultyModifier,
          rewardMultiplier: game.options.rewardMultiplier,
          phoneFrequencyMultiplier: game.options.phoneFrequencyMultiplier
        }}
        onSubmit={values => {
          fetch("http://localhost:4040/game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(res => {
              history.push(match.url.replace("/create", ""));
            })
            .catch(console.error);
        }}
      >
        {() => {
          return (
            <Form className="w-5/6 mx-auto mt-8 lg:w-1/2">
              <div>
                <h1 className="text-3xl tracking-wide text-indigo-600 uppercase">
                  Update Game
                </h1>
              </div>
              <div className="p-6 mt-6 bg-white rounded shadow">
                <div>
                  <Label htmlFor="difficultyModifier">
                    Difficulty Modifier
                  </Label>
                  <Field as={Input} name="difficultyModifier" type="number" />
                </div>
                <div>
                  <Label htmlFor="rewardMultiplier">Reward Multiplier</Label>
                  <Field as={Input} name="rewardMultiplier" type="number" />
                </div>
                <div>
                  <Label htmlFor="phoneFrequencyMultiplier">
                    Phone Frequency Multiplier
                  </Label>
                  <Field
                    as={Input}
                    name="phoneFrequencyMultiplier"
                    type="number"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-6">
                <div className="order-1 ml-4">
                  <Button type="submit">Submit</Button>
                </div>
                <div>
                  <Button variant="danger" type="button" onClick={stopGame}>
                    Stop
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
