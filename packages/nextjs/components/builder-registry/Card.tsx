import React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`bg-base-100 px-8 py-8 rounded-xl ${className}`}>{children}</div>;
};
