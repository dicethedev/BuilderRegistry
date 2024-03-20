import { useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Modal } from "~~/components/builder-registry";
import { SubmitWorkForm } from "~~/components/builder-registry/SubmitWorkForm";
import { ContributionList } from "~~/components/builder-registry/contributions/ContributionList";
import { ContributorDetails, ContributorHeader, ContributorSkills } from "~~/components/builder-registry/contributor";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributor: Contributors;
}

const ContributorProfile: NextPage<IProps> = ({ contributor }) => {
  const { address } = useAccount();
  const isUserProfile = contributor?.id === address;
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
      <div className="flex flex-col flex-grow pt-2 bg-white">
        {/* Contributor Header */}
        <ContributorHeader
          id={contributor.id}
          title={contributor.function}
          dateJoined={contributor.creationTimestamp}
          isUserProfile={isUserProfile}
          handleOpenModal={handleOpenModal}
        />

        {/* Contributor Skills and Details */}
        <div className="border-t mt-4 mb-4">
          <div className="container mx-auto grid md:grid-cols-2">
            <ContributorSkills skills={contributor.skills} />
            <ContributorDetails
              isUserProfile={isUserProfile}
              status={contributor.status?.text}
              socials={contributor.socialLinks}
            />
          </div>
        </div>

        {/* Contributors Contributions */}
        <div className="container mx-auto ">
          <p className="font-bold italic">
            Total Contributions : <span> {contributor.builds.length} 🛠</span>
          </p>
          <ContributionList contributions={contributor.builds} />
        </div>

        {/* Submit Work Modal */}
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
