// InputTextArea.tsx
import React, { TextareaHTMLAttributes } from "react";

interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  labelInfo?: string;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ labelInfo, label, placeholder, ...rest }) => {
  return (
    <div className="my-3 mb-5">
      <label className="block text-[#5F6587] text-sm font-bold">
        {label} <span className="font-medium">{labelInfo}</span> <sup className="text-red-500">*</sup>
      </label>
      <textarea
        className="border p-2 px-4 rounded-md w-full mt-2 border-[#DED1EC] placeholder-text-[#9699AA] placeholder:text-sm resize-none min-h-[8rem] md:min-w-[40rem] placeholder:font-medium"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputTextArea;
