import React from "react";
import { StyledLink } from "./StyledLink";

export interface ILink {
  text: string;
  to: string;
}

export interface BreadcrumbsProps {
  links: ILink[];
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <span className="space-x-2">
      {links.map((link, index) => {
        return (
          <span className="text-indigo-600 space-x-2">
            <StyledLink to={link.to}>{link.text}</StyledLink>
            {index === links.length - 1 ? null : <span>{">"}</span>}
          </span>
        );
      })}
    </span>
  );
};
