import React from "react";
import { Button } from "./Button";

interface PageAction {
  text: string;
  onClick: () => void;
}

export interface PageProps {
  title: string;
  subtitle?: string;
  primaryAction?: PageAction;
  secondaryAction?: PageAction;
  children: React.ReactNode;
}

export const Page = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  children
}: PageProps) => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl tracking-wide text-indigo-600 uppercase">
          {title}
        </h1>
        <div className="flex items-center justify-between w-full">
          {subtitle ? <div>{subtitle}</div> : null}
          <div className="flex items-center ml-auto">
            {primaryAction ? (
              <div className="order-last">
                <Button
                  type="button"
                  variant="primary"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                </Button>
              </div>
            ) : null}
            {secondaryAction ? (
              <div className="mr-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.text}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
