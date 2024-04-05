import type { NextPage } from "next";
import Select from "react-select";
import { MetaHeader } from "~~/components/MetaHeader";
import InputField from "~~/components/builder-registry/InputField";
import InputTextArea from "~~/components/builder-registry/InputTextArea";

const MultiSelect = () => {
  const options = [
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "Video Content Creation", label: "Video Content Creation" },
    { value: "UX Writing", label: "UX Writing" },
    { value: "Social media management", label: "Media Management" },
    { value: "Community Management", label: "Community Management" },
    { value: "Business Development", label: "Business Development" },
    { value: "Frontend Engineering", label: "Frontend Engineering" },
    { value: "Backend Engineering", label: "Backend Engineering" },
    { value: "Smart Contract Engineering", label: "Smart Contract Engineering" },
  ];

  const styles: any = {
    control: (css: any) => ({
      ...css,
      fontSize: "0.85rem",
      fontWeight: "600",
      borderColor: "#DED1EC",
      padding: "0.1rem 0.5rem",
    }),
    option: (
      styles: any,
      { isDisabled, isFocused }: { data?: any; isDisabled: boolean; isFocused: boolean; isSelected?: boolean },
    ) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#940CFF" : "white",
        color: isFocused ? "white" : "#5F6587",
        fontSize: "0.85rem",
        cursor: isDisabled ? "not-allowed" : "default",
        boxShadow: "none",
        borderRadius: "0.2rem",
        borderColor: "#DED1EC",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled ? (isFocused ? "black" : "red") : undefined,
        },
      };
    },
  };

  return (
    <div className="my-3">
      <label className="block text-[#5F6587] text-sm font-semibold mb-2">Skills</label>
      <Select options={options} isMulti placeholder="Select skills" styles={styles} />
    </div>
  );
};

const EditProfile: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow py-8 bg-white">
        <div className="container mx-auto lg:w-[60%]">
          <div>
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <form className="mt-10">
              <h3 className="text-xl font-medium">Personal Details</h3>

              <InputTextArea label="Bio" placeholder="Describe yourself" />
              <InputField label="Currently working at" name="Work" placeholder="Buidlers ltd" />

              <MultiSelect />

              <hr className="my-16 w-[100%]" />
              <h3 className="text-xl font-medium">Socials</h3>
              <div className="w-full grid grid-cols-2 gap-8 gap-y-2">
                <InputField label="Github" name="Github" />
                <InputField label="Website" name="Link" />

                <InputField label="Telegram" name="Telegram" />
                <InputField label="Twitter" name="Twitter" placeholder="Twitter.com/username" />
                <InputField label="Youtube" name="Youtube" />
              </div>

              <button className="bg-[#AAAEB8] text-white rounded-lg w-full py-3 px-3 mt-8 font-medium text-sm">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
