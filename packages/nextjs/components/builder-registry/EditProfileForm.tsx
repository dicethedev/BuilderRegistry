import React, { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import InputTextArea from "./InputTextArea";
import MultiSelect, { OptionType } from "./MultiSelect";
import { useAccount, useSignMessage } from "wagmi";
import { socials } from "~~/data/social";
import { MessageType } from "~~/types/builder-registry/signedMessageTypes";
import { SocialLinks } from "~~/types/builders";
import { getSignMessageForId } from "~~/utils/builder-registry/sign";

type FormData = {
  socialLinks: SocialLinks;
  skills?: string[];
  status?: string;
};

type FormType = {
  socialLinks: SocialLinks;
  skills?: OptionType[];
  status?: string;
};

export const EditProfileForm: React.FC<FormData> = FormData => {
  const { address } = useAccount();
  const [formData, setFormData] = useState<FormType>({
    status: FormData.status || "",
    socialLinks: FormData.socialLinks,
    skills: FormData.skills?.map(s => ({ label: s, value: s })) || [],
  });

  console.log(formData);

  const { status, skills, socialLinks } = formData;

  const { signMessageAsync } = useSignMessage({
    onSettled(data, error) {
      error && console.error(`${error}`);
      console.log("Settled", { data, error });
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signMessageAsync, MessageType.APPLY_FOR_BOUNTY, getSignMessageForId, address);
    //const signature = await signMessage();
    //console.log({ signature });
    // console.log(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    setFormData(prevData => ({
      ...prevData,
      skills: selectedSkills.map(s => ({ label: s, value: s })),
    }));
  };

  return (
    <form className="mt-10" onSubmit={handleFormSubmit}>
      <h3 className="text-xl font-medium">Personal Details</h3>

      <InputTextArea label="Bio" placeholder="Describe yourself" name="status" value={status} onChange={handleChange} />
      <MultiSelect value={skills} onChange={handleSkillsChange} />

      <hr className="my-16 w-[100%]" />
      <h3 className="text-xl font-medium">Socials</h3>
      <div className="w-full grid grid-cols-2 gap-8 gap-y-2">
        {Object.entries(socials).map(([socialId, socialData]) => (
          <InputField
            key={socialId}
            label={socialData.label}
            name={socialId}
            placeholder={socialData.placeholder}
            value={`${socialLinks[socialId as keyof SocialLinks]}`}
            onChange={e => {
              const value = e.target.value;
              console.log(value);
              setFormData(prevData => ({
                ...prevData,
                socialLinks: {
                  ...prevData.socialLinks,
                  [socialId]: value,
                },
              }));
            }}
          />
        ))}
      </div>

      <button className="bg-primary text-white rounded-lg w-full py-3 px-3 mt-8 font-medium text-sm" type="submit">
        Update Profile
      </button>
    </form>
  );
};
