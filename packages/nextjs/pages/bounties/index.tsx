import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BountyCard } from "~~/components/builder-registry/BountyCard";
import { Bounties } from "~~/types/builders";

interface IProps {
  bounties: Bounties[];
}

const BountiesPage: NextPage<IProps> = ({ bounties }) => {
  const [query, setQuery] = useState<string>("");

  const filterBounties = () => {
    if (!query) {
      return bounties;
    }

    const lowercasedQuery = query.toLowerCase();

    return bounties.filter((bounty: Bounties) => {
      return bounty.title.toLowerCase().includes(lowercasedQuery);
    });
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

            <div className="flex flex-col justify-between items-center md:flex-row">
              <div className="flex gap-10 my-6 items-center flex-wrap">
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Contents
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Development
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Design
                </div>
                <div className="flex items-center">
                  <Image src="/img/explorer.svg" alt="chart" width={33} height={33} className="mr-3" />
                  Others
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="border p-2 rounded-md min-w-[20rem]"
                />
              </div>
            </div>

            <div className="gap-6 mt-4 grid">
              {filterBounties().map((bounty: Bounties) => (
                <BountyCard
                  index={bounty.id}
                  imageUrl={"/img/card-img2.png"}
                  title={bounty.title}
                  description={"Developed a football game on the Ethereum platform"}
                  key={bounty.id}
                  price={0.4}
                />
              ))}
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
