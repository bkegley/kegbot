import React from "react";
import { IGame } from "../../../../interfaces/IGame";
import { Label, Input, Button } from "../../../../components";
import { Formik, Form, Field } from "formik";

export interface CreateGameProps {
  setGame: React.Dispatch<IGame>;
}

export const CreateGame = ({ setGame }: CreateGameProps) => {
  return (
    <Formik
      initialValues={{
        difficultyModifier: 100,
        phoneFrequencyMultiplier: 100,
        rewardMultiplier: 100
      }}
      onSubmit={(values, { setSubmitting }) => {
        fetch("http://localhost:4040/game/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(setGame)
          .catch(console.error);
        setSubmitting(false);
      }}
    >
      {() => {
        return (
          <Form>
            <h1>Create a Game</h1>
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
            <Button type="submit">Start Game</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
