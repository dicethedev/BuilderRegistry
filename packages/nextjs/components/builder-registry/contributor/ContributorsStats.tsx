import React from "react";
import { CircularBar } from "../CircularBar";
import { TypeStats } from "~~/types/builders";

type ContributorStatsProps = {
  typeStats: TypeStats[];
};

export const ContributorsStats: React.FC<ContributorStatsProps> = ({ typeStats }) => {
  return (
    <div className="flex gap-8 my-6 items-center flex-wrap">
      {typeStats?.map((stat, index) => (
        <div className="flex items-center font-medium circular-bar" key={index}>
          <CircularBar value={stat.count} maxValue={10} />
          <p className="ml-3 capitalize">{stat.name}</p>
        </div>
      ))}
    </div>
  );
};
