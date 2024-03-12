import { useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { useGlobalState } from "~~/services/store/store";
import { web3AuthInstance } from "~~/services/web3/wagmi-web3Auth/googleWalletConfig";

const Home: NextPage = () => {
  const setUserInfo = useGlobalState(state => state.setUserInfo);
  const { connector } = useAccount();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (web3AuthInstance) {
          const userInfo = await web3AuthInstance.getUserInfo();
          console.log(userInfo);
          setUserInfo(userInfo);
        }
      } catch (error) {
        // console.error(error);
      }
    };
    getUserInfo();
  }, [connector]);
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-16">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Builders Registry</span>
          </h1>

          <div className="grid mt-5 md:grid-cols-3 gap-5">
            <div className="border rounded-lg p-6 py-12">
              <h2 className="text-4xl font-semibold">12</h2>
              <p className="text-lg">Contributors</p>
            </div>
            <div className="border rounded-lg px-6 py-12">
              <h2 className="text-4xl font-semibold">2</h2>
              <p className="text-lg">Contributions</p>
            </div>
            <div className="border rounded-lg px-6 py-12">
              <h2 className="text-4xl font-semibold">1</h2>
              <p className="text-lg">Opened Bounties</p>
            </div>
          </div>
        </div>
        <Link href={"/contributors"} className="btn btn-secondary btn-xl mx-auto text-white mt-16 capitalize w-[20%] ">
          Explore
        </Link>
      </div>
    </>
  );
};

export default Home;
