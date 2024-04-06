import { useState } from "react";
import InputField from "../InputField";
import InputTextArea from "../InputTextArea";
import type { NextPage } from "next";
import { FileWithPath, useDropzone } from "react-dropzone";
import { MetaHeader } from "~~/components/MetaHeader";
import UploadIcon from "~~/components/assets/icons/UploadIcon";
import { EtherInput } from "~~/components/scaffold-eth";

const CreateBountyForm: NextPage = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [ethAmount, setEthAmount] = useState("");

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow py-8 bg-white">
        <div className="container mx-auto lg:w-[60%]">
          <div>
            <h2 className="text-3xl font-semibold">Create Bounty</h2>
            <form className="mt-10" onSubmit={handleSubmit}>
              <h3 className="text-xl font-medium">Bounty Details</h3>
              <InputField
                label="Bounty Title"
                placeholder="Redesign our current user interface"
                name="bountyTitle"
                labelInfo=" (e.g Redesign our current user interface)"
              />
              <div className="my-3 mb-5">
                <label className="block text-[#5F6587] text-sm font-bold mb-2">
                  Reward <span className="font-medium">(Amount to be Rewarded)</span>
                </label>
                <EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} />
              </div>

              <InputTextArea
                label="Description"
                placeholder="Describe your bounty"
                labelInfo="(A very detailed description of what the bounty is about, please follow this format) "
              />
              <section className="border border-[#DED1EC] rounded-lg w-full mt-2 py-5 px-4 cursor-pointer ">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <div className="flex items-center space-x-5">
                    <UploadIcon />
                    <div>
                      <p className="text-sm text-[#3C3E4E] font-medium">Click to upload or drag and drop</p>
                      <span className="bg-[#F3ECF8] px-3 text-[#5F6587] py-1 rounded text-[0.75rem] font-medium mt-1 inline-block">
                        Max Size: 5MB
                      </span>
                    </div>
                  </div>
                </div>
                <aside className="mt-3">
                  <ul className="text-sm text-[#3C3E4E] font-medium">{files}</ul>
                </aside>
              </section>
              <hr className="my-16 w-[100%]" />
              <h3 className="text-xl font-medium">Company Social Links</h3>
              <div className="w-full grid grid-cols-2 gap-8 gap-y-2">
                <InputField label="Github" name="Github" />
                <InputField label="Website" name="Link" />

                <InputField label="Telegram" name="Telegram" />
                <InputField label="Twitter" name="Twitter" placeholder="Twitter.com/username" />
                <InputField label="Youtube" name="Youtube" />
              </div>
              <button className="bg-[#AAAEB8] text-white rounded-lg w-full py-2 px-3 mt-8" type="submit">
                {" "}
                Create Bounty
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBountyForm;
