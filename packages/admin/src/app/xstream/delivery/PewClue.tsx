import React from "react";
import { useSocket } from "../../../hooks/useSocket";

interface IHelp {
  [command: string]: {
    use: string;
    description: string;
  };
}

export const PewClue = () => {
  const socket = useSocket();
  const [help, setHelp] = React.useState<IHelp>({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    socket.on("pew-clue", help => {
      setHelp(help);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    });
  }, []);

  return (
    <div>
      {visible ? (
        <div className="p-6 text-white bg-gray-600">
          <h1>Help</h1>
          {Object.keys(help).map(key => {
            return (
              <div key={key}>
                <h3 className="mt-4 text-2xl">{key}</h3>
                <p>{help[key].use}</p>
                <p>{help[key].description}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
