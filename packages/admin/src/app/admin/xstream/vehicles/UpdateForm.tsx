import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { IVehicle } from "../../../../interfaces";
import { Formik, Form, Field } from "formik";
import { Label, Input, Button } from "../../../../components";

interface UpdateVehicleFormProps {
  vehicleId: string;
}

export const UpdateVehicleForm = ({ vehicleId }: UpdateVehicleFormProps) => {
  const [vehicle, setVehicle] = React.useState<IVehicle | null>(null);

  const match = useRouteMatch();
  const history = useHistory();

  React.useEffect(() => {
    fetch(`http://localhost:4040/xstream/vehicles/${vehicleId}`)
      .then(res => res.json())
      .then(res => setVehicle(res))
      .catch(console.error);
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:4040/xstream/vehicles/${vehicleId}`, {
      method: "DELETE"
    })
      .then(res => {
        history.push(match.url.replace(`/${vehicleId}`, ""));
      })
      .catch(console.error);
  };

  if (!vehicle) return null;

  return (
    <div>
      <div className="text-indigo-600">
        <Link to={`${match.url.replace(`/${vehicleId}`, "")}`}>
          {"<< Go Back"}
        </Link>
      </div>
      <Formik
        initialValues={{
          name: vehicle.name,
          cost: vehicle.cost,
          baseSpeed: vehicle.baseSpeed,
          baseHealth: vehicle.baseHealth
        }}
        onSubmit={values => {
          fetch(`http://localhost:4040/xstream/vehicles/${vehicleId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(console.log)
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
