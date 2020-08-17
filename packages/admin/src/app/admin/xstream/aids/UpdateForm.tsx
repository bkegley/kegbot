import React from "react";
import {
  Input,
  Label,
  Checkbox,
  Button,
  TextArea
} from "../../../../components";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { IAid } from "../../../../interfaces";

export interface UpdateAidFormProps {
  aidId: number;
}

export const UpdateAidForm = ({ aidId }: UpdateAidFormProps) => {
  const match = useRouteMatch();
  const history = useHistory();
  const [aid, setAid] = React.useState<IAid | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:4040/aids/${aidId}`)
      .then(res => res.json())
      .then(setAid)
      .catch(console.error);
  }, [aidId]);

  const handleDelete = () => {
    fetch(`http://localhost:4040/aids/${aid.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        history.push(match.url.replace(`/${aidId}`, ""));
      })
      .catch(console.error);
  };

  if (!aid) return null;

  return (
    <div>
      <div className="text-indigo-600">
        <Link to={`${match.url.replace(`/${aidId}`, "")}`}>{"<< Go Back"}</Link>{" "}
      </div>
      <Formik
        initialValues={{
          name: aid.name ?? "",
          description: aid.description ?? "",
          cost: aid.cost ?? 0,
          expendable: aid.expendable ?? false,
          healthModification: aid.healthModification ?? 0,
          speedModification: aid.speedModification ?? 0,
          speedModificationTimeout: aid.speedModificationTimeout ?? 0
        }}
        onSubmit={(values, { setSubmitting }) => {
          fetch(`http://localhost:4040/aids/${aid.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(res => {
              setSubmitting(false);
            })
            .catch(err => {
              console.error(err);
              setSubmitting(false);
            });
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="w-5/6 p-6 mx-auto mt-8 bg-white rounded shadow lg:w-1/2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Field as={Input} name="name" />
              </div>
              <div>
                <Label htmlFor="descripition">Description</Label>
                <Field as={TextArea} name="description" />
              </div>
              <div>
                <Label htmlFor="cost">Cost</Label>
                <Field as={Input} name="cost" type="number" />
              </div>
              <div>
                <Label htmlFor="expendable">Expendable</Label>
                <Checkbox
                  checked={values.expendable}
                  id="expendable"
                  onClick={() =>
                    setFieldValue("expendable", !values.expendable)
                  }
                />
              </div>
              <div>
                <Label htmlFor="healthModification">Health Modification</Label>
                <Field as={Input} name="healthModification" type="number" />
              </div>
              <div>
                <Label htmlFor="speedModification">Speed Modification</Label>
                <Field as={Input} name="speedModification" type="number" />
              </div>
              <div>
                <Label htmlFor="speedModificationTimeout">
                  Speed Modification Timeout
                </Label>
                <Field
                  as={Input}
                  name="speedModificationTimeout"
                  type="number"
                />
              </div>
              <div className="flex items-center justify-end mt-6">
                <div className="order-1 ml-4">
                  <Button type="submit">Submit</Button>
                </div>
                <div>
                  <Button onClick={handleDelete} type="button" variant="danger">
                    Delete
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
