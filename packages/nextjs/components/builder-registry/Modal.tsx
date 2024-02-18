import React from "react";

type ModalProps = {
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[20] bg-[#00000030]">
      <div className="p-8 rounded-md bg-base-100">
        <h3 className="text-xl mb-4">{title}</h3>
        <p>Some other stuffs in the card...</p>
        <div>{children}</div>
        <button className="bg-[#aaaeb8] text-white py-2 px-4 rounded-md mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
