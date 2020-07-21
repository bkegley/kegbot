import React from "react";
import { Header } from "./Header";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="mt-20">{children}</main>
    </div>
  );
};
