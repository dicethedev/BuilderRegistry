import React from "react";
import { ContributorAddress } from "./ContributorAddress";

type ContributorHeaderProps = {
  id: string;
  title: string;
  dateJoined: string | number | Date;
  isUserProfile: boolean;
  handleOpenModal?: () => void;
};

export const ContributorHeader: React.FC<ContributorHeaderProps> = ({
  id,
  title,
  dateJoined,
  isUserProfile,
  handleOpenModal,
}) => {
  const getDateJoined = (date: string | number | Date): string => {
    const dateJoined = new Date(date);
    return dateJoined.toLocaleString("default", { month: "long" }) + " " + dateJoined.getFullYear();
  };

  return (
    <div className="relative container mx-auto">
      <div className="flex flex-col items-center text-center max-w-[30rem] justify-center mx-auto">
        <ContributorAddress address={id} />
        <p className="text-customgray font-[500] my-2 capitalize">{title}</p>
        <p className="text-[0.9rem]">Joined {getDateJoined(dateJoined)}</p>
      </div>
      {isUserProfile && (
        <div className="absolute top-2 right-2 flex space-x-4 justify-center mt-3 md:mt-0">
          <button className="btn btn-tertiary text-black btn-sm border border-primary">Create Bounty</button>
          <button className="btn btn-primary text-white btn-sm" onClick={handleOpenModal}>
            Submit Personal Work
          </button>
        </div>
      )}
    </div>
  );
};
