import React from "react";
import { Input, Label, Button } from "../../../../components";
import { useHistory } from "react-router-dom";

export const CreateVehiclePage = () => {
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState(0);

  const handleSubmit = () => {
    fetch("http://localhost:4040/xstream/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cost })
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        history.push("/admin/xstream/vehicles");
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1 className="text-3xl tracking-wide text-indigo-600 uppercase">
        Create New
      </h1>
      <div className="w-3/5 mx-auto">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
      </div>
      <div className="w-3/5 mx-auto">
        <Label htmlFor="cost">Cost</Label>
        <Input
          type="number"
          value={cost}
          onChange={e => setCost(parseInt(e.currentTarget.value))}
        />
      </div>
      <div className="flex justify-end mt-8">
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
