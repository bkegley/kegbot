import React from "react";

export interface InputProps {
  disabled?: boolean;
  [x: string]: any;
}

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border ${
        props.disabled ? "border-transparent" : "border-indigo-600"
      }`}
    />
  );
};
