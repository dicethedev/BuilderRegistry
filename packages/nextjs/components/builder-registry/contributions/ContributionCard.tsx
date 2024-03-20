import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContributionLikeButton } from "./ContributionLikeButton";

type CardProps = {
  index: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
};

export const ContributionCard: React.FC<CardProps> = ({ imageUrl, index, title, description, likes }) => {
  const [error, setError] = useState(false);
  const truncateText = (str: string) => {
    return str.length > 150 ? str.substring(0, 136) + "..." : str;
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
          <p className="py-2 text-sm"> {truncateText(description)}</p>
        </div>
      </div>
      <div className="p-2 flex justify-between">
        <Link
          href={`/contributions/${index}`}
          className="btn-primary bg-secondary btn w-[75%] text-white border-none text-sm"
        >
          View
        </Link>
        <ContributionLikeButton likes={likes} />
      </div>
    </div>
  );
};
