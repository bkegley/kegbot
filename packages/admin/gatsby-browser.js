import React from "react";
import "./src/styles/styles.css";
import { BrowserRouter } from "react-router-dom";

export const wrapRootElement = ({ element }) => {
  return <BrowserRouter>{element}</BrowserRouter>;
};
