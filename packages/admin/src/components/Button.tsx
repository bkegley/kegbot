import React from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "text" | "danger";
  [x: string]: any;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return <button {...props} className={`btn btn-${variant}`} />;
};
