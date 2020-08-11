import React from "react";
import { CommandCreateForm } from "./CreateForm";
import { RouteChildrenProps } from "react-router-dom";
import { Page } from "../../../components/Page";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export interface CommandCreatePageProps extends RouteChildrenProps {}

export const CommandCreatePage = ({
  history,
  match
}: CommandCreatePageProps) => {
  return (
    <div>
      <Breadcrumbs
        links={[
          {
            to: `${match.url.replace("/commands/create", "")}`,
            text: "Admin"
          },
          {
            to: `${match.url.replace("/create", "")}`,
            text: "Commands"
          }
        ]}
      />
      <div className="mx-auto mt-10 md:w-3/4 lg:w-1/2">
        <Page title="Create New Command">
          <div className="p-6 bg-white rounded shadow">
            <CommandCreateForm
              onCreateSuccess={data =>
                history.push(`${match.url.replace("/create", "")}/${data.id}`)
              }
            />
          </div>
        </Page>
      </div>
    </div>
  );
};
