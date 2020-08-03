import React from "react";
import { Input, Label, Checkbox, Button } from "../../../../components";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export const CreatePew = () => {
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <div className="w-1/2 mx-auto space-y-4">
      <div className="text-indigo-600">
        <Link to={`${match.url.replace("/create", "")}`}>{"<< Go Back"}</Link>
      </div>
      <Formik
        initialValues={{
          name: "",
          cost: 0,
          expendable: false,
          healthModification: 0,
          speedModification: 0,
          speedModificationTimeout: 0
        }}
        onSubmit={(values, { setSubmitting }) => {
          fetch("http://localhost:4040/pews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(res => {
              setSubmitting(false);
              history.push(match.url.replace("/create", ""));
            })
            .catch(err => {
              console.error(err);
              setSubmitting(false);
            });
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="space-y-4">
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
                  <Label htmlFor="healthModification">
                    Health Modification
                  </Label>
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
              </div>
              <div className="flex items-center justify-end mt-6">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
