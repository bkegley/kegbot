import React from "react";
import { IPew } from "../../../../interfaces";
import { Input, Label, Checkbox, Button } from "../../../../components";

export interface PewProps {
  pew: IPew;
}

export const Pew = ({ pew }: PewProps) => {
  const [name, setName] = React.useState(pew.name);
  const [cost, setCost] = React.useState(pew.cost);
  const [expendable, setExpendable] = React.useState(pew.expendable);

  const handleSubmit = () => {
    fetch(`http://localhost:4040/pews/${pew.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cost, expendable })
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:4040/pews/${pew.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className="w-1/2 mx-auto mb-12 space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          value={name}
          id="name"
          onChange={e => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <Label htmlFor="cost">Cost</Label>
        <Input
          value={cost}
          id="cost"
          type="number"
          onChange={e => setCost(e.currentTarget.value)}
        />
      </div>
      <div>
        <Label htmlFor="expendable">Expendable</Label>
        <Checkbox
          checked={expendable}
          id="expendable"
          onClick={() => setExpendable(!expendable)}
        />
      </div>
      <div className="flex items-center justify-end">
        <div className="order-1 ml-4">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
