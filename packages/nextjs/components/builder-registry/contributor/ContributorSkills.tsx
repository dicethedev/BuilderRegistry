import React from "react";

type ContributorSkillsProps = {
  skills: string[];
};

export const ContributorSkills: React.FC<ContributorSkillsProps> = ({ skills }) => {
  return (
    <div className="py-6 pr-16 bg-base-100 rounded-lg px-6">
      <h2 className="mb-3 font-semibold text-[#3C3E4E]">Skills</h2>
      <div className="flex gap-x-2 flex-wrap gap-y-2 py-2">
        {skills?.length > 0 ? (
          skills.map((skill, index) => {
            return (
              <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md" key={index}>
                {skill}
              </span>
            );
          })
        ) : (
          <div className=" w-full border border-[#DED1EC] p-6 py-12 flex items-center justify-center col-span-3 rounded-xl font-medium">
            No Skill Listed
          </div>
        )}
      </div>
    </div>
  );
};
