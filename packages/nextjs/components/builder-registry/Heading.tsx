import React from "react";

type HeadingProps = {
  text: string;
  count?: number;
};

export const Heading: React.FC<HeadingProps> = ({ text, count }) => {
  return (
    <span className="font-medium  text-[#9699AA] border border-[#F8F5FA] rounded-lg py-2 px-2 text-[0.8rem] cursor-pointer ">
      <span>{text}</span>
      {count && <span className="text-[#FF00A8] bg-[#FFEDFC] rounded p-1 text-[0.75rem] ml-1">{count}</span>}
    </span>
  );
};
