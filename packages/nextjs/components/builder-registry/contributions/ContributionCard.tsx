import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContributionLikeButton } from "./ContributionLikeButton";
import LinkIcon from "~~/components/assets/icons/LinkIcon";

type CardProps = {
  index: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  demoUrl: string;
};

export const ContributionCard: React.FC<CardProps> = ({ imageUrl, index, title, description, likes, demoUrl }) => {
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);

  const truncateText = (str: string) => {
    return str.length > 150 ? str.substring(0, 136) + "..." : str;
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div key={index} className="border border-[#DED1EC] rounded-xl flex flex-col justify-between">
      <div>
        <div className="py-1 min-h-[250px] w-full relative rounded-t-xl">
          <Image
            src={!error ? imageUrl : "/img/card-img.png"}
            alt={title + " image"}
            layout="fill"
            className="rounded-t-xl border-b border-[#DED1EC] object-cover"
            style={{
              objectPosition: "top center",
            }}
            onError={() => setError(true)}
          />
        </div>
        <div className="p-6 ">
          <p className="font-semibold">{title}</p>
          <p className="py-2 text-sm font-medium text-[#3C3E4E]"> {truncateText(description)}</p>
        </div>
      </div>

      <div className="grid grid-cols-[68%,auto,auto] gap-x-2 mb-6 pl-6 pr-3">
        <Link href={`/contributions/${index}`} className="btn-primary bg-secondary btn text-white border-none text-sm">
          View
        </Link>
        <Link
          href={demoUrl || "#"}
          className="border-[#DED1EC] border py-2 px-2 rounded-lg flex items-center justify-center"
        >
          <LinkIcon />
        </Link>

        <div>
          <ContributionLikeButton likes={likes} liked={liked} onLike={handleLike} />
        </div>
      </div>
    </div>
  );
};
