import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Card } from "~~/components/builder-registry/Card";
import Modal from "~~/components/builder-registry/Modal";
import contributorsData from "~~/data/contributors";

const ContributorProfile: NextPage = () => {
  const { address } = useAccount();
  const displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
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

            <p className="text-customgray font-[500] my-2">{contributorsData[0].title}</p>
            <p className="text-[0.9rem]">Joined December 2023</p>
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
                index={index}
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
            <form>
              <div>
                <label htmlFor="title">
                  <span className="font-medium">Project Title</span>
                  <span className="ml-1">(The name of the project you’re building)</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  aria-label="title"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
                  placeholder="Add Link"
                />
              </div>

              <div>
                <label htmlFor="role">
                  <span className="font-medium">Add Role</span>
                  <span className="ml-1"> (The role you played in this project)</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  aria-label="role"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
                  placeholder="Lead Engineer"
                />
              </div>

              <div>
                <label htmlFor="submissionLink" className="font-medium text-lightgray">
                  <span className="text-lightgray">Description</span>
                  <span className="ml-1"> (A brief description of what your project is about)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  aria-label="Description"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2 resize-none min-h-[7rem]"
                  placeholder="0x...."
                />
              </div>

              <div>
                <label htmlFor="submissionLink" className="font-medium text-lightgray">
                  <span className="text-lightgray">Link to your Project</span>
                </label>
                <input
                  type="text"
                  id="submissionLink"
                  name="submissionLink"
                  aria-label="Submission Link"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
                  placeholder="0x...."
                />
              </div>

              <button type="submit" className="bg-[#AAAEB8] text-white rounded-lg w-full py-2 px-3 mt-8">
                Add
              </button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ContributorProfile;
