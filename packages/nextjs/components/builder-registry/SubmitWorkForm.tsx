import React, { ChangeEvent, useState } from "react";
import { AddressInput } from "../scaffold-eth";

type FormData = {
  title: string;
  role: string;
  description: string;
  submissionLink: string;
};

export const SubmitWorkForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    role: "",
    description: "",
    submissionLink: "",
  });
  const [coBuilders, setCoBuilders] = useState<string[]>([]);
  const MAX_CO_BUILDERS = 6;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const { title, role, description, submissionLink } = formData;

  const isFormFilled = title && role && description;

  return (
    <form>
      <div>
        <label htmlFor="title">
          <span className="font-medium">Project Title</span>
          <span className="ml-1">(The name of the project you’re building)</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          aria-label="title"
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="Add Link"
        />
      </div>

      <div>
        <label htmlFor="role">
          <span className="font-medium">Add Role</span>
          <span className="ml-1"> (The role you played in this project)</span>
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={handleChange}
          aria-label="role"
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="Lead Engineer"
        />
      </div>

      <div>
        <label htmlFor="submissionLink" className="font-medium text-lightgray">
          <span className="text-lightgray">Description</span>
          <span className="ml-1"> (A brief description of what your project is about)</span>
        </label>
        <textarea
          id="description"
          name="description"
          aria-label="Description"
          value={description}
          onChange={handleChange}
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2 resize-none min-h-[7rem]"
          placeholder="0x...."
        />
      </div>

      <div>
        <label htmlFor="coBuilders" className="font-medium">
          <span>Co-Builders</span>
          <button type="button" onClick={handleAddCoBuilder} className="ml-2 font-bold">
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

      <div>
        <label htmlFor="submissionLink" className="font-medium text-lightgray">
          <span className="text-lightgray">Link to your Project</span>
        </label>
        <input
          type="text"
          id="submissionLink"
          name="submissionLink"
          aria-label="Submission Link"
          required
          value={submissionLink}
          onChange={handleChange}
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="0x...."
        />
      </div>

      <button
        type="submit"
        className={`${isFormFilled ? "bg-primary" : "bg-[#AAAEB8]"} text-white rounded-lg w-full py-2 px-3 mt-8`}
      >
        Add
      </button>
    </form>
  );
};
