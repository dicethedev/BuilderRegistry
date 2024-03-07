import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Card } from "~~/components/builder-registry/Card";
import Modal from "~~/components/builder-registry/Modal";
import { SubmitWorkForm } from "~~/components/builder-registry/SubmitWorkForm";
import contributorsData from "~~/data/contributors";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributor: Contributors;
}

const ContributorProfile: NextPage<IProps> = ({ contributor }) => {
  const { address } = useAccount();
  const displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const getDateJoined = (date: string | number | Date): string => {
    const dateJoined = new Date(date);
    return dateJoined.toLocaleString("default", { month: "long" }) + " " + dateJoined.getFullYear();
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-8 bg-white">
        <div className="relative container mx-auto">
          <div className="flex flex-col items-center text-center max-w-[30rem] justify-center mx-auto">
            <Image src={"/img/profile.png"} width={64} height={64} alt="profile image" className="my-4" />
            <div className="font-bold">
              {address ? (
                <p className="text-[0.9rem]">{displayAddress}</p>
              ) : (
                <p className="text-[0.9rem]">0x000..000</p>
              )}
            </div>

            <p className="text-customgray font-[500] my-2">{contributor.function}</p>
            <p className="text-[0.9rem]">Joined {getDateJoined(contributor.creationTimestamp)}</p>
          </div>
          <div className="flex space-x-4 md:absolute top-2 right-2 justify-center mt-3 md:mt-0">
            <button className="btn btn-tertiary text-black btn-sm border border-primary ">Create Bounty</button>
            <button className="btn btn-primary text-white btn-sm" onClick={handleOpenModal}>
              Submit Personal Work
            </button>
          </div>
        </div>

        <div className="border-t mt-12 mb-12">
          <div className="container mx-auto grid md:grid-cols-2">
            <div className="py-6 pr-16">
              <h2 className="mb-3 text-lg font-bold text-[#3C3E4E]">Skills</h2>
              <div className="flex gap-x-2 flex-wrap gap-y-2">
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">UI/UX Design</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">Illustrator</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">Graphic Design</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">UX Writing</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">Social Media Management</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">Community Management</span>
                <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">UI/UX Design</span>
              </div>
            </div>
            <div className="py-6 pl-10 border-l md:w-[80%]">
              <h2 className="mb-3 text-lg font-bold text-[#3C3E4E]">Details</h2>
              <div className="text-sm">
                <div>
                  <p className="font-medium">Bio</p>
                  <p className="mt-2">{contributorsData[0].bio}</p>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Currently works at</p>
                  <p className="mt-2">Wapiti Labs</p>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Links</p>
                  <div className="flex gap-3 mt-3">
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
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-12">
          <p className="font-bold italic">
            Total Contributions : <span> {contributorsData[0].contributions.length} 🛠</span>
          </p>

          <div className="grid md:grid-cols-3 gap-6 py-4">
            {contributorsData[0].contributions.map((contribution, index: number) => (
              <Card
                index={index.toString()}
                imageUrl={contribution.img}
                title={contribution.title}
                description={contribution.description}
                likes={contribution.likes}
                key={index}
              />
            ))}
          </div>
        </div>

        {showModal && (
          <Modal title="Submit Personal Work" onClose={handleCloseModal}>
            <SubmitWorkForm />
          </Modal>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const contributorsId = ctx.params?.contributorsId;
    const response = await fetch(`http://localhost:3000/api/builders/profile/${contributorsId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const contributor: Contributors = await response.json();
    console.log(contributor);

    return {
      props: { contributor },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contributor: null },
    };
  }
};

export default ContributorProfile;