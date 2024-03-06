import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../assets/HeartIcon";

type CardProps = {
  index: number;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
};

export const Card: React.FC<CardProps> = ({ imageUrl, index, title, description, likes }) => {
  return (
    <div key={index} className="border border-[#DED1EC] rounded-xl flex flex-col justify-between">
      <div>
        <div className="py-1 min-h-[250px] w-full relative rounded-t-xl">
          <Image src={imageUrl} alt={title + " image"} layout="fill" className="rounded-t-xl" />
        </div>
        <div className="p-6 pb-3">
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

      <div className="p-6 flex justify-between">
        <Link href="/contributions/ee" className="btn-primary bg-secondary btn w-[75%] text-white border-none">
          View
        </Link>
        <button className="py-2 px-2 w-[21%] border-[#DED1EC] border-2 rounded-lg flex items-center justify-center gap-2 font-medium">
          {likes}
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};
