import React from "react";
import { Input, Label, Checkbox, Button } from "../../../../components";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

export const CreatePew = () => {
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [expendable, setExpendable] = React.useState(true);

  const history = useHistory();
  const match = useRouteMatch();

  const handleSubmit = () => {
    fetch("http://localhost:4040/pews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cost, expendable })
    }).then(res => {
      history.push(match.url.replace("/create", ""));
    });
  };

  return (
    <div className="w-1/2 mx-auto space-y-4">
      <div className="text-indigo-600">
        <Link to={`${match.url.replace("/create", "")}`}>{"<< Go Back"}</Link>
      </div>
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
      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
