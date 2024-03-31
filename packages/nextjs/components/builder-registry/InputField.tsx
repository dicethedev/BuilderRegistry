// InputField.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, ...rest }) => {
  return (
    <div className="my-3">
      <label className="block">{label}</label>
      <input className="border p-2 rounded-md w-full mt-3" placeholder={placeholder} {...rest} />
    </div>
  );
};

export default InputField;
