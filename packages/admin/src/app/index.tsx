import React from "react";
import { useSocket } from "../hooks/useSocket";
import { Switch, Route } from "react-router-dom";
import { Commands } from "./commands";

export const App = () => {
  const socket = useSocket();
  const [messages, setMessages] = React.useState<string[]>([]);
  console.log({ messages });

  React.useEffect(() => {
    socket.on("message", (data: string) => {
      console.log({ data });
      setMessages(old => old.concat(data));

      return () => socket.close();
    });
  }, []);

  return (
    <div>
      <h1 className="text-indigo-600">Messages</h1>
      {messages.map(message => (
        <p key={message}>{message}</p>
      ))}
      <Switch>
        <Route path="/">{() => <Commands />}</Route>
      </Switch>
    </div>
  );
};
