// InputField.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  labelInfo?: string;
}

const InputField: React.FC<InputFieldProps> = ({ labelInfo, label, placeholder, ...rest }) => {
  return (
    <div className="my-3">
      <label className="block">
        {label} <span>{labelInfo}</span> <sup className="text-red-500">*</sup>
      </label>{" "}
      <input className="border p-2 rounded-md w-full mt-3" placeholder={placeholder} {...rest} />
    </div>
  );
};

export default InputField;
