import React from "react";

export interface InputProps {
  editable?: boolean;
  [x: string]: any;
}

export const Input = ({ editable = true, ...props }: InputProps) => {
  return (
    <input
      disabled={!editable}
      {...props}
      className={`w-full px-4 py-2 border ${
        editable ? "border-indigo-600" : "border-transparent"
      }`}
    />
  );
};
