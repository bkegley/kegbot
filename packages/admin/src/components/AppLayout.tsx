import React from "react";
import { Header } from "./Header";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container py-32 mx-auto">{children}</main>
    </div>
  );
};
