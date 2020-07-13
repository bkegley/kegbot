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
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="command">Command</Label>
          <Input
            type="text"
            id="command"
            value={command}
            onChange={e => setCommand(e.currentTarget.value)}
          />
        </div>
        <div>
          <Label htmlFor="response">Response</Label>
          <Input
            type="text"
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
        <div></div>
        <div className="flex flex-col items-end mt-6 md:flex-row md:justify-end md:items-center md:space-x-4 space-y-4">
          <div className="md:mt-4 md:ml-4 md:order-">
            <Button type="button" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
