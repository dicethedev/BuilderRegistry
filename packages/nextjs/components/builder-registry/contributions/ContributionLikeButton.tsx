import React from "react";
import { HeartIcon } from "../../assets/icons/HeartIcon";

type ContributionLikeButtonProps = {
  likes: number;
};

export const ContributionLikeButton: React.FC<ContributionLikeButtonProps> = ({ likes }) => {
  return (
    <button className="py-2 px-2 w-[21%] border-[#DED1EC] border-2 rounded-lg flex items-center justify-center gap-2 font-medium">
      {likes}
      <HeartIcon />
    </button>
  );
};
