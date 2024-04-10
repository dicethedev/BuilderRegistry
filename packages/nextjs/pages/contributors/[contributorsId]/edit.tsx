import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { EditProfileForm } from "~~/components/builder-registry/EditProfileForm";
import { Contributors } from "~~/types/builders";

interface IProps {
  contributor: Contributors;
}

const EditProfile: NextPage<IProps> = ({ contributor }) => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow py-8 bg-white">
        <div className="container mx-auto lg:w-[60%]">
          <div>
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <EditProfileForm
              status={contributor.status?.text}
              socialLinks={{
                twitter: "",
                email: "",
                github: "",
                website: "",
                youtube: "",
                telegram: "",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const contributorsId = ctx.params?.contributorsId;
    console.log(contributorsId);
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

export default EditProfile;
