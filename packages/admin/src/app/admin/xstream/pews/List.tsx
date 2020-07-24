import React from "react";
import { PewSuggestionUpdateForm } from "./UpdateForm";
import { IPewSuggestion, PewSuggestionStatus } from "./IPew";
import { useSocket } from "../../../../hooks/useSocket";
import { Button } from "../../../../components";

export const PewList = () => {
  const socket = useSocket();
  const [pews, setPews] = React.useState<IPewSuggestion[]>([]);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [status, setStatus] = React.useState<PewSuggestionStatus[]>([
    PewSuggestionStatus.PENDING
  ]);

  React.useEffect(() => {
    if (shouldFetch) {
      fetch(`http://localhost:4040/pew-suggestions?status=${status}`)
        .then(res => res.json())
        .then(res => {
          setPews(res);
          setShouldFetch(false);
        })
        .catch(console.error);
    }

    socket.on("pew-moderated", ({ id, status }) => {
      const newPews = pews.map(pew =>
        pew.id.toString() === id ? { ...pew, status } : pew
      );
      setPews(newPews);
    });
  }, [shouldFetch]);

  const handleSelection = (selectedStatus: PewSuggestionStatus) => {
    const existingStatus = status.find(stat => stat === selectedStatus);
    setStatus(existingStatus ? status : status.concat(selectedStatus));
  };

  return (
    <div>
      <select
        onChange={e =>
          handleSelection(e.currentTarget.value as PewSuggestionStatus)
        }
      >
        <option value={PewSuggestionStatus.PENDING}>Pending</option>
        <option value={PewSuggestionStatus.APPROVED}>Approved</option>
        <option value={PewSuggestionStatus.DENIED}>Denied</option>
      </select>
      <div className="flex items-center mt-6 space-x-4">
        {status.map(stat => {
          return (
            <div className="flex items-center justify-between bg-indigo-200 rounded">
              <span className="px-2 py-1">{stat}</span>
              <span
                className="px-2 py-1 text-white bg-indigo-600"
                onClick={() =>
                  setStatus(
                    status.filter(existingStat => existingStat !== stat)
                  )
                }
              >
                x
              </span>
            </div>
          );
        })}
      </div>
      <div className="my-4">
        <Button onClick={() => setShouldFetch(true)}>Fetch</Button>
      </div>
      <div className="flex flex-wrap items-center space-x-4">
        {pews.map(pew => {
          return (
            <div key={pew.id}>
              <PewSuggestionUpdateForm pew={pew} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
