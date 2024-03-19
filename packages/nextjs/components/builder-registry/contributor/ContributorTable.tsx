import React from "react";
import { Address } from "~~/components/scaffold-eth";
import { Contributors } from "~~/types/builders";

type ContributorTableProps = {
  contributors: Contributors[];
};

export const ContributorTable: React.FC<ContributorTableProps> = ({ contributors }) => {
  return (
    <div className="overflow-x-auto">
      <table role="table" className="w-full text-left table-fixed min-w-[700px] overflow-x-hidden mt-6">
        <thead>
          <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
            <th className="py-3 w-[30%] md:w-auto">Contributors</th>
            <th className="py-3 w-[38%]">Bio</th>
            <th className="py-3 w-[20%]">Submissions</th>
            <th className="py-3 text-right">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor, index: number) => (
            <tr key={index} className="border-b border-[#DED1EC]">
              <td className="py-5 pr-4">
                <Address address={contributor.id} format="short" disableAddressLink={true} />
              </td>
              <td className="py-5 pr-8">
                {contributor.status && contributor.status.text
                  ? contributor.status.text
                  : "ex business developer for ethereum foundation, currently supporting open-source development: bit.ly/shaneeth"}
              </td>
              <td className="py-5">12</td>
              <td className="py-5 text-right">12 days ago</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
