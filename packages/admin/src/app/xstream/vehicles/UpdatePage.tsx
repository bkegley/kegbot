import React from "react";
import { IVehicle } from "./IVehicle";
import { Formik, Form, Field } from "formik";

interface UpdateVehiclePageProps {
  id: string;
}

export const UpdateVehiclePage = ({ id }: UpdateVehiclePageProps) => {
  const [vehicle, setVehicle] = React.useState<IVehicle | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:4040/xstream/vehicles/${id}`)
      .then(res => res.json())
      .then(res => setVehicle(res))
      .catch(console.error);
  }, []);

  const [num, setNum] = React.useState(0);

  if (!vehicle) return null;

  return (
    <div>
      <Formik
        initialValues={{
          name: vehicle.name,
          cost: vehicle.cost,
          baseSpeed: vehicle.baseSpeed,
          baseHealth: vehicle.baseHealth
        }}
        onSubmit={values => {
          fetch(`http://localhost:4040/xstream/vehicles/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field name="name" id="name" type="text" />
              </div>
              <div>
                <label htmlFor="cost">Cost</label>
                <CustomNumberSelector
                  value={values.cost}
                  onChange={value => setFieldValue("cost", value)}
                />
              </div>
              <div>
                <label>Base Health</label>
                <CustomNumberSelector
                  value={values.baseHealth}
                  onChange={value => setFieldValue("baseHealth", value)}
                />
              </div>
              <div>
                <label>Base Speed</label>
                <CustomNumberSelector
                  value={values.baseSpeed}
                  onChange={value => setFieldValue("baseSpeed", value)}
                />
              </div>
              <div>
                <button type="submit">Save</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface CustomNumberSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const CustomNumberSelector = ({
  value,
  onChange
}: CustomNumberSelectorProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div
        className="text-2xl text-red-400"
        onClick={() => onChange(value - 1)}
      >
        {"<"}
      </div>
      <div>{value}</div>
      <div
        className="text-2xl text-green-400"
        onClick={() => onChange(value + 1)}
      >
        {">"}
      </div>
    </div>
  );
};
