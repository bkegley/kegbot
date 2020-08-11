import React from "react";
import { ICommand } from "../../../interfaces/ICommand";
import { Link, useRouteMatch } from "react-router-dom";

export interface CommandProps {
  command: ICommand;
}

export const Command = ({ command }: CommandProps) => {
  const match = useRouteMatch();
  return (
    <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
      <div className="w-full p-6">
        <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
          {command.command}
        </h3>
        {command.modOnly ? (
          <span className="px-2 py-px text-xs font-medium text-red-900 bg-red-300 rounded-full leading-4">
            Mod Only
          </span>
        ) : null}
        <div className="mt-4">
          <div className="w-full">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Aliases
            </dt>
            <dd className="mt-2 text-sm text-gray-900 leading-5">
              {command.aliases.length ? (
                command.aliases.map(alias => (
                  <span className="px-2 py-1 bg-gray-300 rounded">
                    {alias.alias}
                  </span>
                ))
              ) : (
                <span>N/A</span>
              )}
            </dd>
          </div>
          <div className="mt-6">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Response
            </dt>
            <dd className="mt-2 text-sm text-gray-900 leading-5">
              {command.response}
            </dd>
          </div>
        </div>
      </div>
      <Link to={`${match.url}/${command.id}`}>
        <div className="flex w-full py-2 overflow-hidden bg-gray-200">
          <p className="w-full text-center">Edit</p>
        </div>
      </Link>
    </li>
  );
};
