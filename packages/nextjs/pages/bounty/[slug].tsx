import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Modal from "~~/components/builder-registry/Modal";

const BountyDetails: NextPage = () => {
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
      <div className="flex flex-col flex-grow pt-4 bg-base-100">
        <div className="flex flex-col items-center text-center max-w-[30rem] justify-center mx-auto mb-10">
          <Image src={"/img/profile.png"} width={64} height={64} alt="profile image" className="my-4" />
          <div className="font-bold">
            <p className="text-[.9rem]"></p>
          </div>

          <p className="text-customgray font-[500] my-2">Create a SoulBound NFT for Membership</p>
          <p className="text-[0.9rem]">by ETHAbuja</p>
          <p className="mt-1">Deadline: Feb 7th, 2024</p>
        </div>
        <div className="border-t border-[#f3edf7]">
          <div className="grid grid-cols-6 py-12 container mx-auto">
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#3C3E4E]">Skills Needed</h3>
              <p className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">UI/UX Design</p>
            </div>
            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Total Prize Pool</h3>
              <p>
                <span
                  className=" 
                 text-2xl font-semibold mr-2"
                >
                  0.4
                </span>
                ETH
              </p>
            </div>
            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Total Submissions</h3>
              <p
                className=" 
                 text-2xl font-semibold"
              >
                1
              </p>
            </div>

            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Time Remaining</h3>
              <div
                className=" 
                 text-2xl font-semibold text-primary"
              >
                144h:12m
              </div>
            </div>
            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">People Interested</h3>
              <div
                className=" 
                 text-2xl font-semibold"
              >
                112
              </div>
            </div>
            <div>
              <button className="btn btn-primary text-white w-full" onClick={handleOpenModal}>
                Submit
              </button>
            </div>
          </div>
        </div>

        <section className="bg-[#F7FAFC] pt-12 pb-16">
          <div className="w-[70%] mx-auto bg-base-100 p-8 rounded-xl">
            <h2 className="font-medium text-xl">Bounty Details</h2>
            <div className="my-8">
              <h3 className="font-medium mb-3">What to do</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="my-8">
              <h3 className="font-medium mb-3">Features</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="my-8">
              <h3 className="font-medium mb-3">Guidelines</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="my-8">
              <h3 className="font-medium mb-3">Evaluation Criteria</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="my-8">
              <h3 className="font-medium mb-3">Prize Selection</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          <div className="w-[70%] mx-auto bg-base-100 p-8 rounded-xl mt-12">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </section>
        {showModal && (
          <Modal title="bill" onClose={handleCloseModal}>
            hELLO
          </Modal>
        )}
      </div>
    </>
  );
};

export default BountyDetails;
