import React from "react";
import { Link, LinkProps } from "react-router-dom";

export interface StyledLinkProps extends LinkProps {}

export const StyledLink = ({ ...props }: StyledLinkProps) => {
  return (
    <Link
      {...props}
      className="tracking-wide text-indigo-600 uppercase hover:underline"
    />
  );
};
