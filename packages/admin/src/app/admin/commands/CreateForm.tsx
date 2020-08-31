import React from "react";
import { Formik, Form, Field } from "formik";
import { Label, Input, Button, TextArea, Checkbox } from "../../../components";
import { ICommand } from "./ICommand";

export interface CommandCreateFormProps {
  onCreateSuccess?: (data: ICommand) => void;
  onCreateError?: (err: any) => void;
  onCancel?: () => void;
}

const initialValues: Omit<ICommand, "aliases"> = {
  command: "",
  response: "",
  modOnly: false
};

export const CommandCreateForm = ({
  onCreateSuccess,
  onCreateError,
  onCancel
}: CommandCreateFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        fetch("http://localhost:4040/commands/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(res => {
            setSubmitting(false);
            if (onCreateSuccess) {
              onCreateSuccess(res);
            }
          })
          .catch(err => {
            setSubmitting(false);
            if (onCreateError) {
              onCreateError(err);
            }
          });
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <div className="space-y-4">
              <div>
                <Label htmlFor="command">Command</Label>
                <Field as={Input} type="text" id="command" name="command" />
              </div>
              <div>
                <Label htmlFor="response">Response</Label>
                <Field as={TextArea} id="response" name="response" />
              </div>
              <div>
                <Label htmlFor="modOnly">Mod Only?</Label>
                <Checkbox
                  checked={values.modOnly}
                  onClick={() => setFieldValue("modOnly", !values.modOnly)}
                />
              </div>
            </div>
            <div className="flex flex-col items-end mt-6 md:flex-row md:justify-end md:items-center md:space-x-4 space-y-4">
              <div className="md:mt-4 md:ml-4 md:order-2">
                <Button type="submit">Create</Button>
              </div>
              {onCancel ? (
                <div>
                  <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              ) : null}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
