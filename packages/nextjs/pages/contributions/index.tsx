import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import GridIcon from "~~/components/assets/icons/GridIcon";
import ListIcon from "~~/components/assets/icons/ListIcon";
import { SearchBar } from "~~/components/builder-registry";
import { TableRow } from "~~/components/builder-registry/TableRow";
import { ContributionCard } from "~~/components/builder-registry/contributions/ContributionCard";
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

  const truncateText = (str: string) => {
    return str.length > 150 ? str.substring(0, 136) + "..." : str;
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
                    <GridIcon />
                  </button>
                  <button onClick={setListView}>
                    <ListIcon />
                  </button>
                </div>
              </div>
            </div>

            {display ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {filterContributions().map((contribution: Contributions) => (
                  <ContributionCard
                    index={contribution.id}
                    imageUrl={contribution.image}
                    title={contribution.name}
                    description={truncateText(contribution.desc)}
                    likes={contribution.likes.length}
                    key={contribution.id}
                  />
                ))}
              </div>
            ) : (
              <table role="table" className="w-full text-left table-fixed mt-6">
                <thead>
                  <tr className="uppercase border-b border-[#DED1EC] text-[0.9rem]">
                    <th className="py-3 ">Img</th>
                    <th className="py-3 w-[19%]">title</th>
                    <th className="py-3 w-[28%]">Description</th>
                    <th className="py-3 w-[20%]">contributors</th>
                    <th className="py-3">Likes</th>
                    <th className="py-3 text-right">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {filterContributions().map((contribution: Contributions, index: number) => (
                    <TableRow
                      index={contribution.id}
                      imageUrl={contribution.image}
                      title={contribution.name}
                      description={truncateText(contribution.desc)}
                      likes={contribution.likes.length}
                      address={contribution.builder}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
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
