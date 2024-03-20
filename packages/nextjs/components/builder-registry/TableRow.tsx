import React, { useState } from "react";
import Image from "next/image";
import HeartIcon from "../assets/icons/HeartIcon";
import { Address } from "~~/components/scaffold-eth";

type TableProps = {
  index: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  address: string;
};

export const TableRow: React.FC<TableProps> = ({ imageUrl, index, title, description, likes, address }) => {
  const [error, setError] = useState(false);

  return (
    <tr key={index} className="border-b border-[#DED1EC]">
      <td className="py-1 pr-2">
        <div></div>
        <Image
          src={!error ? imageUrl : "/img/card-img.png"}
          width={148}
          height={80}
          alt={title + " image"}
          onError={() => setError(true)}
          className="rounded-lg h-[80px] w-[148px]"
        />
      </td>
      <td className="py-5 pr-3 font-semibold">{title}</td>
      <td className="py-5 pr-8"> {description}</td>
      <td className="py-5">
        <Address address={address} />
      </td>
      <td className="py-5 font-medium">
        <div className="flex justify-end">
          {" "}
          {likes} <HeartIcon className="ml-1" />
        </div>
      </td>
    </tr>
  );
};
