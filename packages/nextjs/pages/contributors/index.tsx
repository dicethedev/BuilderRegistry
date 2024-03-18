import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { SearchBar } from "~~/components/builder-registry";
import ContributorsStats from "~~/components/builder-registry/ContributorsStats";
import { Address } from "~~/components/scaffold-eth";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributors: Contributors[];
}

const ContributorsPage: NextPage<IProps> = ({ contributors }) => {
  const [query, setQuery] = useState<string>("");
  console.log(query, setQuery);

  const filterContributors = () => {
    if (!query) {
      return contributors;
    }

    const lowercasedQuery = query.toLowerCase();

    return contributors.filter((contributor: Contributors) => {
      return (
        contributor.id.toLowerCase().includes(lowercasedQuery) ||
        contributor.ens?.toLowerCase().includes(lowercasedQuery)
      );
    });
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-6 bg-white">
        <div className="container mx-auto px-6 md:px-0">
          <div>
            <p className="font-bold italic">
              Total Contributors : <span>{contributors.length} 👷</span>
            </p>

            <div className="flex justify-between items-center lg:flex-row flex-col">
              <ContributorsStats />
              <SearchBar query={query} onChange={e => setQuery(e.target.value)} />
            </div>
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
                  {filterContributors().map((contributor, index: number) => (
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
