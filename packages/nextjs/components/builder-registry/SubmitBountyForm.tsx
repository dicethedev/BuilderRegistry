import React from "react";

export const SubmitBountyForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="submissionLink">
          <span className="font-medium">Submission Link</span>
          <span className="ml-1"> (Make sure the link is accessible to everyone)</span>
        </label>
        <input
          type="text"
          id="submissionLink"
          name="submissionLink"
          aria-label="Submission Link"
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="Add Link"
        />
      </div>

      <div>
        <label htmlFor="submissionLink">
          <span className="font-medium">Twitter Link</span>
          <span className="ml-1"> (Post your Submission on twitter and share here)</span>
        </label>
        <input
          type="text"
          id="submissionLink"
          name="submissionLink"
          aria-label="Submission Link"
          required
          className="w-full border bg-transparent mb-6 py-2 px-3 focus:border-primary rounded-lg mt-2"
          placeholder="Add Link"
        />
      </div>

      <div>
        <label htmlFor="submissionLink" className="font-medium text-lightgray">
          <span className="text-lightgray">Your Wallet Address</span>
          <span className="ml-1"> (Make sure it is EVM compatible)</span>
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
        Upload
      </button>
    </form>
  );
};
