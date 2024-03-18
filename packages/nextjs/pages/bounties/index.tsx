import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BountyStatusTab, SearchBar } from "~~/components/builder-registry";
import { BountyCard } from "~~/components/builder-registry/BountyCard";
import { Bounties } from "~~/types/builders";

interface IProps {
  bounties: Bounties[];
}

const BountiesPage: NextPage<IProps> = ({ bounties }) => {
  const [query, setQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);

  const filterBounties = () => {
    let filteredBounties = [...bounties];

    if (activeTab === 1) {
      filteredBounties = filteredBounties.filter(bounty => bounty.active === true);
    } else if (activeTab === 2) {
      filteredBounties = filteredBounties.filter(bounty => bounty.active === false);
    }

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filteredBounties = filteredBounties.filter((bounty: Bounties) => {
        return bounty.title.toLowerCase().includes(lowercasedQuery);
      });
    }

    return filteredBounties;
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-base-100">
        <div className="container mx-auto px-6 md:px-0">
          <div>
            <p className="font-bold italic">
              Opened Bounties:
              <span className="ml-1">{bounties.length} 🤑</span>
            </p>

            <div className="flex flex-col justify-between items-center md:flex-row mt-3">
              <div>
                <BountyStatusTab activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="flex items-center">
                <SearchBar query={query} onChange={e => setQuery(e.target.value)} />
              </div>
            </div>

            <div className="gap-6 mt-12 grid">
              {filterBounties().length === 0 ? (
                <div className="border border-[#DED1EC] p-6 py-12 flex items-center justify-center col-span-3 rounded-xl font-medium">
                  No bounty found
                </div>
              ) : (
                filterBounties().map((bounty: Bounties) => (
                  <BountyCard
                    index={bounty.id}
                    imageUrl={"/img/card-img2.png"}
                    title={bounty.title}
                    description={"Developed a football game on the Ethereum platform"}
                    key={bounty.id}
                    price={0.4}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/bounties");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const bounties: Bounties[] = await response.json();

    return {
      props: { bounties },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { bounties: [] },
    };
  }
};

export default BountiesPage;
