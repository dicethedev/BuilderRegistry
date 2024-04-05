import React, { ChangeEvent, useState } from "react";
import { AddressInput } from "../scaffold-eth";
import InputField from "./InputField";
import InputTextArea from "./InputTextArea";

type FormData = {
  title: string;
  description: string;
  submissionLink: string;
};

export const SubmitWorkForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    submissionLink: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { title, description, submissionLink } = formData;

  const isFormFilled = title && description;

  return (
    <form>
      <InputField
        label="Project Title"
        placeholder="Add Link"
        labelInfo="(The name of the project you’re building)"
        required
        name="title"
        value={title}
        onChange={handleChange}
      />

      <InputField
        label="Link to Code"
        placeholder="Add Link"
        labelInfo="(The link to the code you’re working on)"
        required
        name="codeLink"
        onChange={handleChange}
      />

      <InputField
        label="Link to your Project"
        placeholder="Add Link"
        required
        name="submissionLink"
        value={submissionLink}
        onChange={handleChange}
      />

      <InputTextArea
        label="Description"
        labelInfo=" (A brief description of what your project is about)"
        value={description}
        onChange={handleChange}
      />

      {/* Co-Builders Component */}
      <CoBuildersInput onChange={handleChange} />

      <button
        type="submit"
        className={`${
          isFormFilled ? "bg-primary" : "bg-[#AAAEB8]"
        } text-white rounded-lg w-full py-3 px-3 mt-8 text-sm font-medium`}
      >
        Add
      </button>
    </form>
  );
};

const CoBuildersInput: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = () => {
  const [coBuilders, setCoBuilders] = useState<string[]>([]);
  const MAX_CO_BUILDERS = 6;

  const handleCoBuilderChange = (index: number, value: string) => {
    const updatedCoBuilders = [...coBuilders];
    updatedCoBuilders[index] = value;
    setCoBuilders(updatedCoBuilders);
  };

  const handleAddCoBuilder = () => {
    if (coBuilders.length < MAX_CO_BUILDERS) {
      setCoBuilders([...coBuilders, ""]);
    }
  };

  const handleRemoveCoBuilder = (index: number) => {
    const updatedCoBuilders = [...coBuilders];
    updatedCoBuilders.splice(index, 1);
    setCoBuilders(updatedCoBuilders);
  };

  return (
    <div>
      <label htmlFor="coBuilders" className="font-medium mb-2">
        <span className=" text-[#5F6587] text-sm font-bold">Co-Builders</span>
        <button
          type="button"
          onClick={handleAddCoBuilder}
          className="ml-4 px-3 border border-[#DED1EC] rounded text-xl"
        >
          +
        </button>
      </label>
      {coBuilders.map((coBuilder, index) => (
        <div key={index} className="flex items-center mt-2">
          <AddressInput
            placeholder="Builder Address"
            value={coBuilders[index] || ""}
            onChange={value => handleCoBuilderChange(index, value)}
          />
          <button
            type="button"
            onClick={() => handleRemoveCoBuilder(index)}
            className="ml-2 font-bold text-red-500 w-[30px]"
          >
            x
          </button>
        </div>
      ))}
      <div className="my-5"></div>
    </div>
  );
};
