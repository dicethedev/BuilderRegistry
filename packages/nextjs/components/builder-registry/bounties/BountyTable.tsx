import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bounties } from "~~/types/builders";

type TableProps = {
  bounties: Bounties[];
};

export const BountyTable: React.FC<TableProps> = ({ bounties }) => {
  return (
    <div className="overflow-x-auto bg-base-100 px-8 py-5 rounded-lg">
      <table role="table" className="w-full text-left table-fixed min-w-[700px] overflow-x-hidden mt-1">
        <thead>
          <tr className="border-b border-[#DED1EC] text-[0.9rem]">
            <th className="py-3 w-[50%] md:w-auto">Bounty</th>
            <th className="py-3 ">Status</th>
            <th className="py-3 w-[20%] text-center">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bounties.map((bounty, index: number) => (
            <tr key={index} className="border-b border-[#DED1EC] last:border-b-0">
              <td className="py-5 pr-4">
                <div className="flex items-center gap-5">
                  <Image
                    src={bounty.image || "/img/card-img.png"}
                    width={40}
                    height={40}
                    alt={bounty.title + " image"}
                    className="rounded-lg h-[40px] w-[40px]"
                  />
                  <div>
                    <Link href={`/bounties/${bounty.id}`}>
                      <p className="text-[0.9rem] font-semibold mb-2">{bounty.title}</p>
                    </Link>
                    <p className="text-sm text-[#5F6587]">SpeedrunEthereum.com</p>
                  </div>
                </div>
              </td>
              <td className="py-5 pr-8">
                <span className="inline bg-[#EDF4FF] text-[#0063FF] rounded-full px-4 py-2 text-sm font-semibold">
                  Deadline in 29 days
                </span>
              </td>
              <td className="py-5 text-center text-lg">
                <div className="flex items-center justify-center">
                  <Image
                    alt="Eth Logo"
                    src="/img/ethlogo.svg"
                    width={16}
                    height={16}
                    className=" mr-3"
                    title="Eth Logo"
                  />
                  <span className="font-semibold">{bounty.price || 0.6} </span>
                  <span className="text-[#9699AA] ml-2">ETH</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
