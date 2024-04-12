import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import GridIcon from "~~/components/assets/icons/GridIcon";
import ListIcon from "~~/components/assets/icons/ListIcon";
import { SearchBar } from "~~/components/builder-registry";
import { Card } from "~~/components/builder-registry/Card";
import { Heading } from "~~/components/builder-registry/Heading";
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
      <div className="flex flex-col flex-grow pt-6 bg-base-200">
        <div className="container mx-auto px-6 md:px-0">
          <div>
            <div className="flex justify-between items-center flex-col lg:flex-row bg-base-100 px-8 py-3 rounded-lg">
              <Heading text="Total Contributions" count={contributions.length} />

              <div className="flex items-center">
                <SearchBar query={query} onChange={e => setQuery(e.target.value)} />
                <div className="ml-2 space-x-1">
                  <button onClick={setListView} className="inline-block">
                    <ListIcon isActive={!display} />
                  </button>
                  <button onClick={setGridView} className="inline-block">
                    <GridIcon isActive={display} />
                  </button>
                </div>
              </div>
            </div>

            <Card className="my-10 pt-2">
              {display ? (
                <ContributionList contributions={filterContributions()} />
              ) : (
                <ContributionTable contributions={filterContributions()} />
              )}
            </Card>
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
