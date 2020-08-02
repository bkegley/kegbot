import React from "react";
import "./src/styles/styles.css";
import { BrowserRouter } from "react-router-dom";
import { DeliverySessionProvider } from "./src/hooks/DeliverySessionProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <BrowserRouter>
      <DeliverySessionProvider>{element}</DeliverySessionProvider>
    </BrowserRouter>
  );
};
