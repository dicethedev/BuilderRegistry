import React from "react";
import { TableRow } from "../TableRow";
import { Contributions } from "~~/types/builders";

type ContributionTableProps = {
  contributions: Contributions[];
};

export const ContributionTable: React.FC<ContributionTableProps> = ({ contributions }) => {
  const truncateText = (str: string) => {
    return str.length > 150 ? str.substring(0, 136) + "..." : str;
  };

  return (
    <table role="table" className="w-full text-left table-fixed mt-6">
      <thead>
        <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
          <th className="py-3 ">Img</th>
          <th className="py-3 w-[19%]">title</th>
          <th className="py-3 w-[33%]">Description</th>
          <th className="py-3 w-[20%]">contributors</th>
          <th className="py-3 text-right">Likes</th>
        </tr>
      </thead>
      <tbody>
        {contributions.map((contribution: Contributions, index: number) => (
          <TableRow
            index={contribution.id}
            imageUrl={contribution.image}
            title={contribution.name}
            description={truncateText(contribution.desc)}
            likes={contribution.likes.length}
            address={contribution.builder}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
};
