import Link from "next/link";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Card } from "~~/components/builder-registry/Card";
import { BountyTable } from "~~/components/builder-registry/bounties/BountyTable";
import { Favourites } from "~~/components/builder-registry/bounties/Favourites";
import { ProfileHeader } from "~~/components/profile/ProfileHeader";
import { Bounties } from "~~/types/builders";

interface IProps {
  bounties: Bounties[];
}

const BountyDetailsPage: NextPage<IProps> = ({ bounties }) => {
  return (
    <>
      <MetaHeader />
      <ProfileHeader />
      <div className="flex flex-col flex-grow py-5 bg-base-200 px-8">
        <div className="container mx-auto">
          <Card>
            <div className="grid grid-cols-[1fr,1fr,1fr,1fr,30%]">
              <div>
                <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Bounties Submitted</h3>
                <p
                  className=" 
                 text-2xl font-semibold"
                >
                  0
                </p>
              </div>
              <div>
                <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Bounties Created</h3>
                <p
                  className=" 
                 text-2xl font-semibold"
                >
                  0
                </p>
              </div>
              <div>
                <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Bounties Won</h3>
                <p
                  className=" 
                 text-2xl font-semibold"
                >
                  0
                </p>
              </div>
              <div>
                <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Bounties In Review</h3>
                <p
                  className=" 
                 text-2xl font-semibold"
                >
                  0
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/bounties/create" className="btn bg-black btn-neutral rounded-lg capitalize px-8">
                  Create Bounty
                </Link>
              </div>
            </div>
          </Card>
          <div className="flex flex-col flex-grow pt-6 ">
            <div className="grid grid-cols-[75%,25%] mx-auto gap-x-4">
              <BountyTable bounties={bounties} />
              <Favourites />
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

export default BountyDetailsPage;
