import React from "react";
import { CreateNewCommand } from "./CreateNew";
import { StyledLink } from "../../components";

export const CreateNewPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl tracking-wide text-indigo-600 uppercase">
          Create New Command
        </h1>
      </div>
      <CreateNewCommand />
      <div>
        <StyledLink to="/commands">{`<< Go Back`}</StyledLink>
      </div>
    </div>
  );
};
