// InputField.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  labelInfo?: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ labelInfo, label, placeholder, name, ...rest }) => {
  return (
    <div className="my-3 mb-6">
      <label className="block text-[#5F6587] text-sm font-semibold">
        {label} <span className="font-medium">{labelInfo}</span> <sup className="text-red-500">*</sup>
      </label>
      <input
        className="border p-2 px-4 rounded-md w-full mt-2 border-[#DED1EC] placeholder:text-[#9699AA] placeholder:text-sm placeholder:font-medium"
        placeholder={placeholder}
        {...rest}
        type="text"
        name={name}
        id={name}
        aria-label={name}
      />
    </div>
  );
};

export default InputField;
