import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { IVehicle } from "../../../../interfaces";
import { Formik, Form, Field } from "formik";
import { Label, Input, Button } from "../../../../components";

interface UpdateVehicleFormProps {
  vehicleId: string;
}

export const CreateVehicleForm = ({ vehicleId }: UpdateVehicleFormProps) => {
  const match = useRouteMatch();
  const history = useHistory();

  const handleDelete = () => {};

  return (
    <div>
      <div className="text-indigo-600">
        <Link to={match.url.replace("/create", "")}>{"<< Go Back"}</Link>
      </div>
      <Formik
        initialValues={{
          name: "",
          cost: 0,
          baseSpeed: 0,
          baseHealth: 0
        }}
        onSubmit={values => {
          fetch("http://localhost:4040/xstream/vehicles", {
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
              <div className="p-6 bg-white rounded shadow">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Field as={Input} name="name" />
                </div>
                <div>
                  <Label htmlFor="cost">Cost</Label>
                  <Field as={Input} name="cost" type="number" />
                </div>
                <div>
                  <Label htmlFor="baseSpeed">Base Speed</Label>
                  <Field as={Input} name="baseSpeed" type="number" />
                </div>
                <div>
                  <Label htmlFor="baseHealth">Base Health</Label>
                  <Field as={Input} name="baseHealth" type="number" />
                </div>
              </div>
              <div className="flex items-center justify-end mt-6">
                <div className="order-1 ml-4">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
