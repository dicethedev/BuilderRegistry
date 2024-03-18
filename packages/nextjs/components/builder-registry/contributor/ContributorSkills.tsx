import React from "react";

type ContributorSkillsProps = {
  skills: string[];
};

export const ContributorSkills: React.FC<ContributorSkillsProps> = ({ skills }) => {
  return (
    <div className="py-6 pr-16">
      <h2 className="mb-3 text-lg font-bold text-[#3C3E4E]">Skills</h2>
      <div className="flex gap-x-2 flex-wrap gap-y-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => {
            return (
              <span className="px-5 bg-[#F3ECF8] inline text-sm py-2 rounded-md" key={index}>
                {skill}
              </span>
            );
          })
        ) : (
          <p className="text-3xl text-lightgray">No Skill Listed</p>
        )}
      </div>
    </div>
  );
};
