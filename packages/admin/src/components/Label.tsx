import React from "react";

export interface LabelProps {
  [x: string]: any;
}

export const Label = (props: LabelProps) => {
  return <label {...props} className="block text-sm text-gray-800" />;
};
