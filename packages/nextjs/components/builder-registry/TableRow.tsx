import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../assets/HeartIcon";
import { Address } from "../scaffold-eth";

type TableProps = {
  index: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  address: string;
};

export const TableRow: React.FC<TableProps> = ({ imageUrl, index, title, description, likes, address }) => {
  return (
    <tr key={index} className="border-b border-[#DED1EC]">
      <td className="py-1 pr-2">
        <div></div>
        <Image
          src={imageUrl || "/img/card-img.png"}
          width={148}
          height={80}
          alt={title + " image"}
          className="rounded-lg h-[80px] w-[148px]"
        />
      </td>
      <td className="py-5 pr-3 font-semibold">{title}</td>
      <td className="py-5 pr-5"> {description}</td>
      <td className="py-5">
        <Address address={address} />
      </td>
      <td className="py-5 font-medium">
        <div className="flex">
          {" "}
          {likes} <HeartIcon className="ml-1" />
        </div>
      </td>
      <td className="py-5 text-right">
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
      </td>
    </tr>
  );
};
