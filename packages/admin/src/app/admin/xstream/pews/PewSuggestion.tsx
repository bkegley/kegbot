import React from "react";
import { IPewSuggestion, PewSuggestionStatus } from "../../../../interfaces";
import { Button } from "../../../../components";

export interface PewSuggestionProps {
  pewSuggestion: IPewSuggestion;
}

const mapStatusToColorString = (status: PewSuggestionStatus) => {
  switch (status) {
    case PewSuggestionStatus.APPROVED: {
      return "text-green-600 bg-green-200";
    }
    case PewSuggestionStatus.DENIED: {
      return "text-red-600 bg-red-200";
    }
    case PewSuggestionStatus.PENDING: {
      return "text-blue-600 bg-blue-200";
    }
  }
};

export const PewSuggestion = ({ pewSuggestion }: PewSuggestionProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleModerate = (status: string) => {
    fetch(
      `http://localhost:4040/pew-suggestions/${pewSuggestion.id}/moderate`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    )
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <li
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1"
    >
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className={`flex-1 ${expanded ? "" : "truncate"}`}>
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
              {pewSuggestion.name}
            </h3>
            <span
              className={`flex-shrink-0 inline-block px-2 py-px text-xs leading-4 font-medium rounded-full ${mapStatusToColorString(
                pewSuggestion.status
              )}`}
            >
              {pewSuggestion.status.toLowerCase()}
            </span>
          </div>
          <p
            className={`mt-1 text-sm text-gray-500 ${
              expanded ? "" : "truncate"
            } leading-5`}
          >
            {pewSuggestion.description}
          </p>
        </div>
      </div>
      <div className="flex overflow-hidden">
        <div className="w-full">
          <Button
            type="button"
            variant="danger"
            onClick={() => handleModerate(PewSuggestionStatus.DENIED)}
          >
            Deny
          </Button>
        </div>
        <div className="w-full">
          <Button
            type="button"
            onClick={() => handleModerate(PewSuggestionStatus.APPROVED)}
          >
            Approve
          </Button>
        </div>
      </div>
    </li>
  );
};
