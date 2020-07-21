import React from "react";

export interface TextAreaProps {
  disabled?: boolean;
  [x: string]: any;
}

export const TextArea = ({ ...props }: TextAreaProps) => {
  return (
    <textarea
      rows={4}
      {...props}
      className={`w-full px-4 py-2 border ${
        props.disabled ? "border-transparent" : "border-indigo-600"
      }`}
    />
  );
};
