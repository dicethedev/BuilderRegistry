import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Modal from "~~/components/builder-registry/Modal";
import { Contributions } from "~~/types/builders";

interface IProps {
  contribution: Contributions;
}

const BountyDetails: NextPage<IProps> = ({ contribution }) => {
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

          <p className="text-customgray font-[500] my-2">{contribution.name}</p>
          <p className="text-[0.9rem]">by {contribution.builder}</p>
          <p className="mt-1">Deadline: Feb 7th, 2024</p>
        </div>
        <div className="border-t border-[#f3edf7]">
          <div className="grid grid-cols-5 py-12 container mx-auto lg:w-[80%]">
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#3C3E4E]">Contributors</h3>
              <p className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">ceeriil.eth</p>
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
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Likes</h3>
              <div
                className=" 
                 text-2xl font-semibold"
              >
                {contribution.likes.length}
              </div>
            </div>
            <div className="mr-5">
              <button className="btn btn-tertiary text-black w-full" onClick={handleOpenModal}>
                Code
              </button>
            </div>
            <div>
              <button className="btn btn-primary text-white w-full" onClick={handleOpenModal}>
                Live Demo
              </button>
            </div>
          </div>
        </div>

        <section className="bg-[#F7FAFC] pt-12 pb-16">
          <div className="w-[70%] mx-auto bg-base-100 p-8 rounded-xl">
            <h2 className="font-medium text-xl">Project Details</h2>
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
        </section>
        {showModal && (
          <Modal title="Submission Form" onClose={handleCloseModal}>
            <form>
              <div>
                <label htmlFor="submissionLink">
                  <span className="font-medium">Submission Link</span>
                  <span className="ml-1"> (Make sure the link is accessible to everyone)</span>
                </label>
                <input
                  type="text"
                  id="submissionLink"
                  name="submissionLink"
                  aria-label="Submission Link"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
                  placeholder="Add Link"
                />
              </div>

              <div>
                <label htmlFor="submissionLink">
                  <span className="font-medium">Twitter Link</span>
                  <span className="ml-1"> (Post your Submission on twitter and share here)</span>
                </label>
                <input
                  type="text"
                  id="submissionLink"
                  name="submissionLink"
                  aria-label="Submission Link"
                  required
                  className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
                  placeholder="Add Link"
                />
              </div>

              <div>
                <label htmlFor="submissionLink" className="font-medium text-lightgray">
                  <span className="text-lightgray">Your Wallet Address</span>
                  <span className="ml-1"> (Make sure it is EVM compatible)</span>
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
                Upload
              </button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const buildId = ctx.params?.contributionsId;
    const response = await fetch(`http://localhost:3000/api/builds/${buildId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const contribution: Contributions = await response.json();
    console.log(contribution);

    return {
      props: { contribution },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { contribution: null },
    };
  }
};

export default BountyDetails;
