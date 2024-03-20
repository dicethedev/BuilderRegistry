import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { SearchBar } from "~~/components/builder-registry";
import { ContributorTable, ContributorsStats } from "~~/components/builder-registry/contributor";
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

            <ContributorTable contributors={filterContributors()} />
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
