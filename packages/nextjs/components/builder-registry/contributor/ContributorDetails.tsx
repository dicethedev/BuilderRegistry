import React from "react";
import Image from "next/image";
import Link from "next/link";

type ContributorDetailsProps = {
  status?: string;
  isUserProfile: boolean;
};

export const ContributorDetails: React.FC<ContributorDetailsProps> = ({ status, isUserProfile }) => {
  return (
    <div className="py-6 pl-10 border-l md:w-[80%]">
      <h2 className="mb-3 text-lg font-bold text-[#3C3E4E]">Details</h2>
      <div className="text-sm">
        <div>
          <p className="font-medium">Bio</p>
          <div className="mt-2 flex space-x-5 items-center">
            <p>{status}</p>

            {isUserProfile && (
              <Link href="/profile/edit" className="border py-1 px-3 border-[#DED1EC] rounded text-[#9699AA]">
                Edit
              </Link>
            )}
          </div>
        </div>
        <div className="mt-3">
          <p className="font-medium">Currently works at</p>
          <p className="mt-2">Wapiti Labs</p>
        </div>
        <div className="mt-3">
          <p className="font-medium">Links</p>
          <div className="flex gap-3 mt-3">
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
  );
};
