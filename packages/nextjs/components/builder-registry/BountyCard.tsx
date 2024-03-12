import React from "react";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  index: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};

export const BountyCard: React.FC<CardProps> = ({ imageUrl, index, title, description, price }) => {
  return (
    <Link href={`/bounties/${index}`}>
      <div key={index} className="border border-[#DED1EC] rounded-xl flex items-center justify-between px-5">
        <div className="flex items-center">
          <div className="p-1 relative rounded-xl border">
            <Image src={imageUrl} alt={title + " image"} width={150} height={150} className="rounded-xl" />
          </div>

          <div className="px-6 py-4">
            <p className="font-semibold">{title}</p>
            <p className="py-2"> {description}</p>
            <div className="pt-5">
              <div className="flex gap-3">
                <Link href="/">
                  <Image src={"/img/github.svg"} width={20} height={20} alt="github"></Image>
                </Link>

                <Image src={"/img/weblink.svg"} width={20} height={20} alt="website link"></Image>

                <Link href="/">
                  <Image src={"/img/youtube.svg"} width={20} height={20} alt="youtube"></Image>
                </Link>
                <Link href="/">
                  <Image src={"/img/twitter.svg"} width={20} height={20} alt="twitter"></Image>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-2xl font-medium">
            {price} <span className="text-[#9699AA]">ETH</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
