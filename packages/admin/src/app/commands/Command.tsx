import React from "react";
import { Label, Input, Button, Checkbox, TextArea } from "../../components";
import { ICommand } from "./ICommand";

export interface CommandProps {
  command: ICommand;
}

export const Command = ({ command }: CommandProps) => {
  const [editable, setEditable] = React.useState(false);
  const [commandText, setCommandText] = React.useState(command.command);
  const [response, setResponse] = React.useState(command.response);
  const [modOnly, setModOnly] = React.useState(command.modOnly);

  React.useEffect(() => {
    if (command.command !== commandText) {
      setCommandText(command.command);
    }
    if (command.response !== response) {
      setResponse(command.response);
    }
    if (command.modOnly !== modOnly) {
      setModOnly(command.modOnly);
    }
  }, [command.command, command.response, command.modOnly]);

  const handleUpdate = () => {
    fetch(`http://localhost:4040/commands/${command.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: commandText, response, modOnly })
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
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor={`command-${command.id}`}>Command</Label>
          <Input
            type="text"
            id={`command-${command.id}`}
            value={commandText}
            onChange={e => setCommandText(e.currentTarget.value)}
            disabled={!editable}
          />
        </div>
        <div>
          <Label htmlFor={`response-${command.id}`}>Response</Label>
          <TextArea
            type="text"
            id={`response-${command.id}`}
            value={response}
            onChange={e => setResponse(e.currentTarget.value)}
            disabled={!editable}
          />
        </div>
        <div>
          <Label htmlFor="modOnly">Mod Only?</Label>
          <Checkbox
            checked={modOnly}
            onClick={() => setModOnly(!modOnly)}
            disabled={!editable}
          />
        </div>
      </div>
      <div className="flex flex-col items-end mt-6 md:flex-row md:justify-end md:items-center md:space-x-4 space-y-4">
        {editable ? (
          <>
            <div className="md:mt-4 md:ml-4 md:order-2">
              <Button type="button" onClick={handleUpdate}>
                Update
              </Button>
            </div>
            <div className="md:order-1">
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
