import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributors: Contributors[];
}

const ContributorsPage: NextPage<IProps> = ({ contributors }) => {
  const [query, setQuery] = useState<string>("");
  console.log(query, setQuery);

  // const filterContributors = () => {
  //   if (!query){
  //     return contributorsData;
  //   }

  //   const lowercasedQuery = query.toLowerCase();

  //   return contributorsData.filter( (contributor: Contributors) => {
  //    return contributor.bio.toLowerCase().includes(lowercasedQuery)
  //   })
  // }

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-white">
        <div className="container mx-auto">
          <div>
            <p className="font-bold italic">
              Total Contributors : <span>{contributors.length} 👷</span>
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-10 my-6 items-center">
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Explorers
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Pioneers{" "}
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Cosmonaut{" "}
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Navigators{" "}
                </div>
              </div>

              <div>
                <input type="text" placeholder="Search..." className="border p-2 rounded-md min-w-[20rem]" />{" "}
              </div>
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
                {contributors.map((contributor, index: number) => (
                  <tr key={index} className="border-b border-[#DED1EC]">
                    <td className="py-5">
                      <Link href={"contributors/" + contributor.id}>
                        <Address address={contributor.id} format="short" disableAddressLink={true} />
                      </Link>
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
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/builders");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const contributors: Contributors[] = await response.json();

    return {
      props: { contributors },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contributors: [] },
    };
  }
};

export default ContributorsPage;
