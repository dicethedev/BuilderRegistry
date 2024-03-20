import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import GridIcon from "~~/components/assets/icons/GridIcon";
import ListIcon from "~~/components/assets/icons/ListIcon";
import { SearchBar } from "~~/components/builder-registry";
import { ContributionList } from "~~/components/builder-registry/contributions";
import { ContributionTable } from "~~/components/builder-registry/contributions/ContributionTable";
import { Contributions } from "~~/types/builders";

interface IProps {
  contributions: Contributions[];
}

const ContributionsPage: NextPage<IProps> = ({ contributions }) => {
  const [display, setDisplay] = useState(true);
  const [query, setQuery] = useState<string>("");

  const setGridView = () => {
    setDisplay(true);
  };

  const setListView = () => {
    setDisplay(false);
  };

  const filterContributions = () => {
    if (!query) {
      return contributions;
    }

    const lowercasedQuery = query.toLowerCase();

    return contributions.filter((contribution: Contributions) => {
      return (
        contribution.name.toLowerCase().includes(lowercasedQuery) ||
        contribution.desc.toLowerCase().includes(lowercasedQuery)
      );
    });
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-6 bg-base-100">
        <div className="container mx-auto px-6 md:px-0">
          <div>
            <p className="font-bold italic">
              Total Contributions : <span>{contributions.length} 👷</span>
            </p>

            <div className="flex justify-between items-center flex-col lg:flex-row">
              <div className="flex gap-8 my-6 items-center flex-wrap"> </div>

              <div className="flex items-center">
                <SearchBar query={query} onChange={e => setQuery(e.target.value)} />
                <div className="ml-2">
                  <button onClick={setGridView}>
                    <GridIcon isActive={display} />
                  </button>
                  <button onClick={setListView}>
                    <ListIcon isActive={!display} />
                  </button>
                </div>
              </div>
            </div>

            {display ? (
              <ContributionList contributions={filterContributions()} />
            ) : (
              <ContributionTable contributions={filterContributions()} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/builds");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const contributions: Contributions[] = await response.json();
    console.log(contributions);

    return {
      props: { contributions },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contributions: [] },
    };
  }
};

export default ContributionsPage;
