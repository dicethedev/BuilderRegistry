import React from "react";
import Link from "next/link";
import { SocialLink } from "./SocialLink";
import { SocialLinksType } from "~~/types/builders";

type ContributorDetailsProps = {
  status?: string;
  isUserProfile: boolean;
  socials?: SocialLinksType;
};

export const ContributorDetails: React.FC<ContributorDetailsProps> = ({ status, isUserProfile, socials }) => {
  return (
    <div className="py-6 pl-10 border-l md:w-[80%]">
      <h2 className="mb-3 text-lg font-bold text-[#3C3E4E]">Details</h2>
      <div className="text-lg">
        <div>
          <p className="font-bold">Bio</p>
          <div className="mt-2 flex space-x-5 items-center">
            <p className="font-medium">{status}</p>

            {isUserProfile && (
              <Link href="/profile/edit" className="border py-1 px-3 border-[#DED1EC] rounded text-[#9699AA]">
                Edit
              </Link>
            )}
          </div>
        </div>
        {socials && (
          <div className="mt-">
            <p className="font-bold">Links</p>
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
