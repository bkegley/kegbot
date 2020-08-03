import React from "react";
import { IGame } from "../../../../interfaces/IGame";
import { Label, Input, Button } from "../../../../components";
import { Formik, Form, Field } from "formik";

export interface UpdateGameProps {
  game: IGame;
  setGame: React.Dispatch<IGame>;
}

export const UpdateGame = ({ game, setGame }: UpdateGameProps) => {
  return (
    <Formik
      initialValues={game.options}
      onSubmit={(values, { setSubmitting }) => {
        fetch("http://localhost:4040/game", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(res => {
            setGame(res);
            setSubmitting(false);
          })
          .catch(err => {
            console.error(err);
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <h1>Update a Game</h1>
            <div>
              <Label htmlFor="difficultyModifier">Difficulty Modifier</Label>
              <Field
                as={Input}
                type="number"
                id="difficultyModifier"
                name="difficultyModifier"
              />
            </div>
            <div>
              <Label htmlFor="phoneFrequencyMultiplier">
                Phone Frequency Modifier
              </Label>
              <Field
                as={Input}
                type="number"
                id="phoneFrequencyMultiplier"
                name="phoneFrequencyMultiplier"
              />
            </div>
            <div>
              <Label htmlFor="rewardMultiplier">Reward Modifier</Label>
              <Field
                as={Input}
                type="number"
                id="rewardMultiplier"
                name="rewardMultiplier"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Start Game
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
