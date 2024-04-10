import React from "react";
import Select from "react-select";

type MultiSelectProps = {
  onChange: (selectedSkills: string[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({ onChange }) => {
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

  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedSkills = selectedOptions.map((option: any) => option.value);
    onChange(selectedSkills);
  };

  return (
    <div className="my-3">
      <label className="block text-[#5F6587] text-sm font-semibold mb-2">Skills</label>
      <Select
        options={options}
        isMulti
        placeholder="Select skills"
        styles={styles}
        onChange={handleMultiSelectChange}
      />
    </div>
  );
};

export default MultiSelect;
