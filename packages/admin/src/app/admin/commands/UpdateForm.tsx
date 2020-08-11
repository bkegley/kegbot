import React from "react";
import { Formik, Form, Field } from "formik";
import { Label, Input, TextArea, Button, Checkbox } from "../../../components";
import { ICommand } from "./ICommand";

export interface CommandUpdateFormProps {
  command: ICommand;
  onUpdateSuccess?: (data: ICommand) => void;
  onUpdateError?: (error: any) => void;
  onDeleteSuccess?: (data: any) => void;
  onDeleteError?: (err: any) => void;
  onCancel?: () => void;
}

export const CommandUpdateForm = ({
  command,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
  onCancel
}: CommandUpdateFormProps) => {
  const [newAlias, setNewAlias] = React.useState("");
  const handleDelete = () =>
    fetch(`http://localhost:4040/commands/${command.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        if (onDeleteSuccess) {
          onDeleteSuccess(res);
        }
      })
      .catch(err => {
        if (onDeleteError) {
          onDeleteError(err);
        }
      });
  return (
    <Formik
      initialValues={command}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`http://localhost:4040/commands/${command.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(res => {
            setSubmitting(false);
            if (onUpdateSuccess) {
              onUpdateSuccess(res);
            }
          })
          .catch(err => {
            setSubmitting(false);
            if (onUpdateError) {
              onUpdateError(err);
            }
          });
      }}
    >
      {({ values, setFieldValue }) => {
        console.log({ values });
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
                <Label htmlFor="aliases">Aliases</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-4">
                    <Input
                      type="text"
                      value={newAlias}
                      onChange={e => setNewAlias(e.currentTarget.value)}
                    />
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setFieldValue(
                            "aliases",
                            values.aliases.concat({ alias: newAlias })
                          );
                          setNewAlias("");
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center mt-4 space-x-4">
                  {values.aliases.map(alias => {
                    const handleClick = () => {
                      setFieldValue(
                        "aliases",
                        values.aliases.filter(
                          existingAlias => existingAlias.alias === alias
                        )
                      );
                    };
                    return (
                      <div>
                        <span className="px-2 py-1 text-gray-900 bg-gray-300">
                          {alias.alias}
                        </span>
                        <span
                          className="px-2 py-1 text-white bg-gray-900 hover:bg-gray-600"
                          onClick={handleClick}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
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
                <Button type="submit">Update</Button>
              </div>
              <div className="md:order-1">
                <Button type="button" variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
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
