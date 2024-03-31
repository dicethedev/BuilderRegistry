import InputField from "../InputField";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const CreateBountyForm: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow py-8 bg-white">
        <div className="container mx-auto lg:w-[60%]">
          <div>
            <h2 className="text-3xl font-semibold">Create Bounty</h2>
            <form className="mt-10">
              <h3 className="text-xl font-medium">Bounty Details</h3>

              <div className="my-3">
                <label htmlFor="description">Bio</label> <br />
                <textarea
                  rows={6}
                  placeholder="Description"
                  className="border p-3 rounded-md min-w-[20rem] mt-3 w-full resize-none min-h-[12rem]"
                />
              </div>
              <InputField label="Bounty Title" placeholder="Redesign our current user interface" />

              <hr className="my-16 w-[100%]" />
              <h3 className="text-xl font-medium">Socials</h3>
              <div className="w-full grid grid-cols-2 gap-8">
                <div className="my-3">
                  <label htmlFor="description">Github</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md w-full mt-3" />
                </div>
                <div className="my-3">
                  <label htmlFor="description">Link</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md w-full mt-3" />
                </div>
                <div className="my-3">
                  <label htmlFor="description">Youtube</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md w-full mt-3" />
                </div>

                <div className="my-3">
                  <label htmlFor="description">Twitter</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md w-full mt-3" />
                </div>
              </div>

              <button className="bg-[#AAAEB8] text-white rounded-lg w-full py-2 px-3 mt-8"> Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBountyForm;
