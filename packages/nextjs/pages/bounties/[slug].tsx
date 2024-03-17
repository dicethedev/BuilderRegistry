import { useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Countdown from "~~/components/builder-registry/CountDown";
import Modal from "~~/components/builder-registry/Modal";
import { SubmitBountyForm } from "~~/components/builder-registry/SubmitBountyForm";
import { Bounties } from "~~/types/builders";

interface IProps {
  bounty: Bounties;
}

const BountyDetails: NextPage<IProps> = ({ bounty }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const sanitizedHTML = DOMPurify.sanitize(bounty.details);

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-base-100">
        <div className="flex flex-col items-center text-center max-w-[30rem] justify-center mx-auto mb-10">
          <Image src={"/img/profile.png"} width={64} height={64} alt="profile image" className="my-4" />
          <div className="font-bold">
            <p className="text-[.9rem]"></p>
          </div>

          <p className="text-customgray font-[500] my-2">{bounty.title}</p>
          <p className="text-[0.9rem]">by ETHAbuja</p>
          <p className="mt-1">Deadline: Feb 7th, 2024</p>
        </div>
        <div className="border-t border-[#f3edf7]">
          <div className="grid grid-cols-6 py-12 container mx-auto">
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#3C3E4E]">Skills Needed</h3>
              <p className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md">{bounty.skills[0]}</p>
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
                {bounty.submissions?.length}
              </p>
            </div>

            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">Time Remaining</h3>
              <div
                className=" 
                 text-2xl font-semibold text-primary"
              >
                <Countdown deadline={bounty.deadLine.toString()} />
              </div>
            </div>
            <div>
              <h3 className="mb-3  text-sm font-medium text-[#3C3E4E]">People Interested</h3>
              <div
                className=" 
                 text-2xl font-semibold"
              >
                {bounty.applications.length}
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
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          </div>

          <div className="w-[70%] mx-auto bg-base-100 p-8 rounded-xl mt-12">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <div>{bounty.resources}</div>
          </div>
        </section>
        {showModal && (
          <Modal title="Submission Form" onClose={handleCloseModal}>
            <SubmitBountyForm />
          </Modal>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const bountyId = ctx.params?.slug;
    const response = await fetch(`http://localhost:3000/api/bounties/${bountyId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const bounty: Bounties = await response.json();
    console.log(bounty);

    return {
      props: { bounty },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: { bounty: null },
    };
  }
};

export default BountyDetails;
