import React from "react";
import { ContributionCard } from "./ContributionCard";
import { Contributions } from "~~/types/builders";

type ContributionListProps = {
  contributions: Contributions[];
};

export const ContributionList: React.FC<ContributionListProps> = ({ contributions }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-4">
      {contributions.length > 0 ? (
        contributions.map((contribution, index) => (
          <ContributionCard
            index={index.toString()}
            imageUrl={contribution.image}
            title={contribution.name}
            description={contribution.desc}
            likes={contribution.likes.length}
            key={index}
          />
        ))
      ) : (
        <div className="border border-[#DED1EC] p-6 py-12 flex items-center justify-center col-span-3 rounded-xl font-medium">
          User have&apos;nt made any contribution yet
        </div>
      )}
    </div>
  );
};
