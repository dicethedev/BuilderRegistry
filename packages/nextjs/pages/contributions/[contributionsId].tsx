import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Contributions } from "~~/types/builders";

interface IProps {
  contribution: Contributions;
}

const BountyDetails: NextPage<IProps> = ({ contribution }) => {
  const displayAddress = (address: string | undefined): string => {
    return address ? address.slice(0, 5) + "..." + address.slice(-4) : "";
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
          <p className="text-[0.9rem]">by {displayAddress(contribution.builder)}</p>
          <p className="mt-1">Last Updated: Feb 7th, 2024</p>
        </div>
        <div className="border-t border-[#f3edf7]">
          <div className="grid md:grid-cols-5 py-12 container mx-auto lg:w-[80%] grid-cols-3 px-6 md:px-0 gap-3">
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#3C3E4E]">Contributors</h3>
              <div className="grid w-[80%]">
                {contribution.coBuilders &&
                  contribution.coBuilders.map((builder, index) => {
                    return (
                      <Link
                        className="px-5 bg-[#F3ECF8] inline-block mb-2 text-sm py-2 rounded-md"
                        key={index}
                        href={`/contributors/${builder}`}
                      >
                        {displayAddress(builder)}
                      </Link>
                    );
                  })}
              </div>
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
              <Link
                className="btn btn-tertiary text-black w-full border border-primary "
                href={contribution.branch}
                target="blank_"
              >
                Code
              </Link>
            </div>
            <div>
              <Link className="btn btn-primary text-white w-full" href={contribution.demoUrl} target="blank_">
                Live Demo
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-[#F7FAFC] pt-12 pb-16">
          <div className="md:w-[70%] mx-auto bg-base-100 p-8 rounded-xl">
            <h2 className="font-medium text-xl">Project Details</h2>
            <div className="leading-[1.7]">{contribution.desc}</div>
          </div>
        </section>
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
