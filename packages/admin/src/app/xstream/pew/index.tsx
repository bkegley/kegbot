import React from "react";
import { useSocket } from "../../../hooks/useSocket";

export const Pew = () => {
  const socket = useSocket();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    socket.on("pewpew-pewed", pew => {
      setData(data.concat(pew));
    });
  }, []);

  return (
    <div>
      <h1>This is our pew page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
