import React from "react";

export interface TextAreaProps {
  disabled?: boolean;
  [x: string]: any;
}

export const TextArea = ({ ...props }: TextAreaProps) => {
  return <textarea {...props} />;
};
