import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import contributorsData from "~~/data/contributors";

const Profile: NextPage = () => {
  const { address } = useAccount();
  const displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-white">
        <div className="flex flex-col items-center text-center max-w-[30rem] justify-center mx-auto">
          <Image src={"/img/profile.png"} width={116} height={116} alt="profile image" className="my-4" />
          <div className="font-bold">
            {address ? <p className="text-[0.9rem]">{displayAddress}</p> : <p className="text-[0.9rem]">0x000..000</p>}
          </div>

          <p className="text-customgray font-[500] my-2">{contributorsData[0].title}</p>
          <p className="text-[0.9rem]">Joined December 2023</p>
          <p className="mt-3">{contributorsData[0].bio}</p>
        </div>

        <div className="container mx-auto mt-12">
          <p className="font-bold italic">
            Total Contributions : <span> {contributorsData[0].contributions.length} 🛠</span>
          </p>

          <div className="grid grid-cols-3 gap-6 py-4">
            {contributorsData[0].contributions.map((contribution, index: number) => (
              <div key={index} className="border border-[#DED1EC] rounded-xl">
                <div className="py-1 min-h-[200px] w-full relative">
                  <Image src={contribution.img} alt={contribution.title + " image"} layout="fill" />
                </div>

                <div className="p-6">
                  <p className="font-semibold">{contribution.title}</p>
                  <p className="py-2">{contribution.description}</p>
                  <div className="pt-5">
                    <div className="flex gap-3">
                      <Link href="/">
                        <Image src={"/img/github.svg"} width={20} height={20} alt="github"></Image>
                      </Link>

                      <Image src={"/img/weblink.svg"} width={20} height={20} alt="website link"></Image>

                      <Link href="/">
                        <Image src={"/img/youtube.svg"} width={20} height={20} alt="youtube"></Image>
                      </Link>
                      <Link href="/">
                        <Image src={"/img/twitter.svg"} width={20} height={20} alt="twitter"></Image>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="btn-primary btn w-[80%] text-white">View</button>
                    <button className="py-5 w-[19%]">{contribution.likes}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
