import React from "react";
import { Input, Label, Checkbox, Button } from "../../../../components";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { IPew } from "../../../../interfaces";

export interface UpdatePewFormProps {
  pewId: number;
}

export const UpdatePewForm = ({ pewId }: UpdatePewFormProps) => {
  const match = useRouteMatch();
  const history = useHistory();
  const [pew, setPew] = React.useState<IPew | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:4040/pews/${pewId}`)
      .then(res => res.json())
      .then(setPew)
      .catch(console.error);
  }, [pewId]);

  const handleDelete = () => {
    fetch(`http://localhost:4040/pews/${pew.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        history.push(match.url.replace(`/${pewId}`, ""));
      })
      .catch(console.error);
  };

  if (!pew) return null;

  return (
    <div>
      <div className="text-indigo-600">
        <Link to={`${match.url.replace(`/${pewId}`, "")}`}>{"<< Go Back"}</Link>{" "}
      </div>
      <Formik
        initialValues={{
          name: pew.name ?? "",
          cost: pew.cost ?? 0,
          expendable: pew.expendable ?? false,
          healthModification: pew.healthModification ?? 0,
          speedModification: pew.speedModification ?? 0,
          speedModificationTimeout: pew.speedModificationTimeout ?? 0
        }}
        onSubmit={(values, { setSubmitting }) => {
          fetch(`http://localhost:4040/pews/${pew.id}`, {
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
              {" "}
              <div>
                <Label htmlFor="name">Name</Label>
                <Field as={Input} name="name" />
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
