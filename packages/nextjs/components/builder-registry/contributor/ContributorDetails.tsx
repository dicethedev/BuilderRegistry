import React from "react";
import { SocialLink } from "./SocialLink";
import { SocialLinksType } from "~~/types/builders";

type ContributorDetailsProps = {
  status?: string;
  socials?: SocialLinksType;
};

export const ContributorDetails: React.FC<ContributorDetailsProps> = ({ status, socials }) => {
  return (
    <div className="">
      <div className="text-lg">
        <div>
          <div className="mt-1 flex space-x-5 items-center">
            <p className="text-[0.9rem] font-medium text-[#5F6587]">{status}</p>
          </div>
        </div>
        {socials && (
          <div className="mt-3">
            <div className="flex gap-3 mt-3">
              {Object.entries(socials).map(([key, value], index) => (
                <SocialLink key={index} id={key} value={value} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
