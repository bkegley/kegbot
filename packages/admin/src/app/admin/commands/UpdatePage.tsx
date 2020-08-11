import React from "react";
import { CommandUpdateForm } from "./UpdateForm";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Page } from "../../../components/Page";
import { ICommand } from "../../../interfaces";

export interface CommandUpdatePage {
  commandId: number;
}

export const CommandUpdatePage = ({ commandId }: CommandUpdatePage) => {
  const match = useRouteMatch();
  const history = useHistory();
  const [command, setCommand] = React.useState<ICommand | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:4040/commands/${commandId}`)
      .then(res => res.json())
      .then(setCommand)
      .catch(console.error);
  }, []);

  if (!command) return null;

  return (
    <div>
      <Breadcrumbs
        links={[
          {
            to: `${match.url.replace(`/commands/${command.id}`, "")}`,
            text: "Admin"
          },
          {
            to: `${match.url.replace(`/${command.id}`, "")}`,
            text: "Commands"
          }
        ]}
      />
      <div className="mx-auto mt-10 md:w-3/4 lg:w-1/2">
        <Page title="Update Command">
          <div className="p-6 bg-white rounded shadow">
            <CommandUpdateForm
              command={command}
              onUpdateSuccess={data =>
                history.push(`${match.url.replace("/update", "")}/${data.id}`)
              }
            />
          </div>
        </Page>
      </div>
    </div>
  );
};
