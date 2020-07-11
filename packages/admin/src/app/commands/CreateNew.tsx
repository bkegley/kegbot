import React from "react";
import { Label, Input, Button } from "../../components";

export const CreateNewCommand = () => {
  const [command, setCommand] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [modOnly, setModOnly] = React.useState(true);

  const handleSubmit = () => {
    fetch("http://localhost:4040/commands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, response, modOnly })
    });
  };

  return (
    <div>
      <div>
        <Label htmlFor="command">Command</Label>
        <Input
          id="command"
          value={command}
          onChange={e => setCommand(e.currentTarget.value)}
        />
      </div>
      <div>
        <Label htmlFor="response">Response</Label>
        <Input
          id="response"
          value={response}
          onChange={e => setResponse(e.currentTarget.value)}
        />
      </div>
      <div>
        <Label htmlFor="modOnly">Mod Only?</Label>
        <input
          type="checkbox"
          checked={modOnly}
          onClick={() => setModOnly(!modOnly)}
        />
      </div>
      <div>
        <Button type="button" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};
