import React from "react";
import { IPewSuggestion, PewSuggestionStatus } from "../../../../interfaces";
import { useSocket } from "../../../../hooks/useSocket";
import { Button } from "../../../../components";
import { PewSuggestion } from "./PewSuggestion";

export const PewSuggestionList = () => {
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

    return () => socket.off("pew-moderated");
  }, [shouldFetch]);

  const handleSelection = (selectedStatus: PewSuggestionStatus) => {
    const existingStatus = status.find(stat => stat === selectedStatus);
    setStatus(existingStatus ? status : status.concat(selectedStatus));
  };

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center justify-end space-x-4">
          <select
            onChange={e =>
              handleSelection(e.currentTarget.value as PewSuggestionStatus)
            }
          >
            <option value={PewSuggestionStatus.PENDING}>Pending</option>
            <option value={PewSuggestionStatus.APPROVED}>Approved</option>
            <option value={PewSuggestionStatus.DENIED}>Denied</option>
          </select>
          <div className="my-4">
            <Button onClick={() => setShouldFetch(true)}>Fetch</Button>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 space-x-4">
          {status.map(stat => {
            return (
              <div className="flex items-center justify-between bg-indigo-200 rounded">
                <span className="px-2 py-1">{stat}</span>
                <span
                  className="px-2 py-1 text-white bg-indigo-600 hover:bg-indigo-900"
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
      </div>
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {pews.map(pew => {
          return <PewSuggestion key={pew.id} pewSuggestion={pew} />;
        })}
      </ul>
    </div>
  );
};
