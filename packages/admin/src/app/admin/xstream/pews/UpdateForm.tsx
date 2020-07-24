import React from "react";
import { Input, Button, Label, TextArea } from "../../../../components";
import { IPewSuggestion } from "./IPew";

interface PewSuggestionUpdateFormProps {
  pew: IPewSuggestion;
}

export const PewSuggestionUpdateForm = ({
  pew
}: PewSuggestionUpdateFormProps) => {
  const { name, description, status } = pew;

  const handleModerate = (status: string) => {
    fetch(`http://localhost:4040/pew-suggestions/${pew.id}/moderate`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} disabled={true} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea id="description" value={description} disabled={true} />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input id="status" value={status} disabled={true} />
        </div>
      </div>
      <div className="flex items-center mt-8">
        <div className="order-2 ml-4">
          <Button variant="primary" onClick={() => handleModerate("approved")}>
            Approve
          </Button>
        </div>
        <div className="order-1 ml-4">
          <Button variant="secondary" onClick={() => handleModerate("pending")}>
            Set Pending
          </Button>
        </div>
        <div>
          <Button variant="danger" onClick={() => handleModerate("denied")}>
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
};
