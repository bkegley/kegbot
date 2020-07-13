import React from "react";

export interface CheckboxProps {
  [x: string]: any;
}

export const Checkbox = ({ id, ...props }: CheckboxProps) => {
  return (
    <input
      {...props}
      //className="inline-block w-4 h-4 text-indigo-600 border border-indigo-600 rounded appearance-none select-none"
      id={id}
      type="checkbox"
    />
  );
};
