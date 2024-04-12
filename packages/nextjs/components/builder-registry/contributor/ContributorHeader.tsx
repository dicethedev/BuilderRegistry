import React from "react";
import Link from "next/link";
import { ContributorAddress } from "./ContributorAddress";
import { ContributorDetails } from "./ContributorDetails";
import { SocialLinks } from "~~/types/builders";

type ContributorHeaderProps = {
  id: string;
  title: string;
  status?: string;
  dateJoined: string | number | Date;
  isUserProfile: boolean;
  handleOpenModal?: () => void;
  socials?: SocialLinks;
};

export const ContributorHeader: React.FC<ContributorHeaderProps> = ({
  id,
  title,
  dateJoined,
  isUserProfile,
  handleOpenModal,
  status,
  socials,
}) => {
  return (
    <div className="relative bg-base-100 rounded-lg py-6 px-12">
      <div className="flex space-x-4 items-center mb-2">
        <span className="font-semibold text-[#4B4D59] border border-[#F8F5FA] rounded-lg py-2 px-3 text-sm ">
          Profile Details
        </span>
        {isUserProfile && (
          <div>
            <button className="btn btn-primary text-white btn-sm inline-block" onClick={handleOpenModal}>
              Submit Personal Work
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div className="max-w-[26rem]">
          <ContributorAddress address={id} dateJoined={dateJoined} title={title} />
          <ContributorDetails status={status} socials={socials} />
        </div>

        {isUserProfile && (
          <Link
            href={"/contributors/" + id + "/edit"}
            className="border py-1 px-3 border-[#DED1EC] rounded text-[#393939] text-[0.8rem] inline-block font-medium mt-6"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
};
