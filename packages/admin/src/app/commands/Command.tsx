import React from "react";
import { Label, Input, Button } from "../../components";
import { ICommand } from "./ICommand";

export interface CommandProps {
  command: ICommand;
}

export const Command = ({ command }: CommandProps) => {
  const [editable, setEditable] = React.useState(false);
  const [commandText, setCommandText] = React.useState(command.command);
  const [response, setResponse] = React.useState(command.response);

  React.useEffect(() => {
    if (command.command !== commandText) {
      setCommandText(command.command);
    }
    if (command.response !== response) {
      setResponse(command.response);
    }
  }, [command.command, command.response]);

  const handleUpdate = () => {
    fetch(`http://localhost:4040/commands/${command.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: commandText, response })
    }).then(res => {
      setEditable(false);
    });
  };

  const handleCancel = () => {
    setCommandText(command.command);
    setResponse(command.response);
    setEditable(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:4040/commands/${command.id}`, { method: "DELETE" });
  };
  return (
    <div>
      <div className="space-y-4">
        <div>
          <Label htmlFor={`command-${command.id}`}>Command</Label>
          <Input
            type="text"
            id={`command-${command.id}`}
            value={commandText}
            onChange={e => setCommandText(e.currentTarget.value)}
            editable={editable}
          />
        </div>
        <div>
          <Label htmlFor={`response-${command.id}`}>Response</Label>
          <Input
            type="text"
            id={`response-${command.id}`}
            value={response}
            onChange={e => setResponse(e.currentTarget.value)}
            editable={editable}
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-6">
        {editable ? (
          <>
            <div className="order-2 ml-4">
              <Button type="button" onClick={handleUpdate}>
                Update
              </Button>
            </div>
            <div className="order-1 ml-4">
              <Button type="button" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            <div>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Button
              type="button"
              variant="text"
              onClick={() => setEditable(old => !old)}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
