import React from "react";

type CardProps = {
  children?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-base-100 px-8 py-8 rounded-xl">{children}</div>;
};
