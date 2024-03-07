import React from "react";

export const SubmitWorkForm = () => {
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
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2 resize-none min-h-[7rem]"
          placeholder="0x...."
        />
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
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="0x...."
        />
      </div>

      <button type="submit" className="bg-[#AAAEB8] text-white rounded-lg w-full py-2 px-3 mt-8">
        Add
      </button>
    </form>
  );
};
