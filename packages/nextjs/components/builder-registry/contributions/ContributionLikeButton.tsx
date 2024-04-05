import React from "react";
import { HeartIcon } from "../../assets/icons/HeartIcon";

type ContributionLikeButtonProps = {
  likes: number;
  onLike?: () => void;
  liked: boolean;
};

export const ContributionLikeButton: React.FC<ContributionLikeButtonProps> = ({ likes, onLike, liked }) => {
  return (
    <button
      onClick={onLike}
      className="py-2 px-2 border-[#DED1EC] border-2 rounded-lg flex items-center justify-center gap-2 font-medium transition duration-0 hover:duration-150 w-[4rem]"
    >
      {likes}
      <HeartIcon className={`w-7 transition duration-0 hover:duration-150 `} active={liked} filled={liked} />
    </button>
  );
};
