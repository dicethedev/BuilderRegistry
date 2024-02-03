import type { NextPage } from "next";
import { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import contributorsData, { Contributors } from "~~/data/contributors";
import Image from "next/image";

const Contributors: NextPage = () => {
  const [query, setQuery] = useState<string>("");

  const filterContributors = () => {
    if (!query){
      return contributorsData;
    }

    const lowercasedQuery = query.toLowerCase();

    return contributorsData.filter( (contributor: Contributors) => {
     return contributor.bio.toLowerCase().includes(lowercasedQuery)
    })
  }

  
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-white">
        <div className="container mx-auto">
          <div>
            <p className="font-bold italic">
              Total Contributors : <span>{contributorsData.length} 👷</span>
            </p>

          <div className="flex justify-between items-center">
          <div className="flex gap-10 my-6 items-center">
              <div className="flex items-center">
                <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Explorers
              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Pioneers              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Cosmonaut              </div>
              <div className="flex items-center">
              <Image src='/img/explorer.svg' alt="chart" width={33} height={33} className="mr-3"/>
              Navigators              </div>
            </div>

            <div>
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-md min-w-[20rem]"
            />            </div>
          </div>
          
            <table role="table" className="w-full text-left table-fixed">
              <thead>
                <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
                  <th className="py-3 ">Contributors</th>
                  <th className="py-3 w-[38%]">Bio</th>
                  <th className="py-3 w-[20%]">Submissions</th>
                  <th className="py-3 text-right">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {contributorsData.map((contributor: Contributors, index: number) => (
                  <tr key={index} className="border-b border-[#DED1EC]">
                    <td className="py-5">{contributor.title}</td>
                    <td className="py-5 pr-8">{contributor.bio}</td>
                    <td className="py-5">{contributor.submissions}</td>
                    <td className="py-5 text-right">{contributor.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributors;
